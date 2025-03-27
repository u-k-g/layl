import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PrayerTime {
	name: string;
	time: Date;
}

interface PrayerTimesResponse {
	code: number;
	status: string;
	data: {
		timings: {
			Fajr: string;
			Sunrise: string;
			Dhuhr: string;
			Asr: string;
			Maghrib: string;
			Isha: string;
		};
		date: {
			readable: string;
			timestamp: string;
		};
		meta: {
			latitude: number;
			longitude: number;
			timezone: string;
		};
	};
}

export function usePrayerTimes() {
	const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
	const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
	const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [settings, setSettings] = useState({
		latitude: 38.9963,
		longitude: -77.4468,
		method: 2,
	});
	const [lastUpdatedPrayer, setLastUpdatedPrayer] = useState<string | null>(null);

	// Load settings from AsyncStorage
	useEffect(() => {
		const loadSettings = async () => {
			try {
				const latitude = await AsyncStorage.getItem("prayer_latitude");
				const longitude = await AsyncStorage.getItem("prayer_longitude");
				const method = await AsyncStorage.getItem("prayer_calculation_method");

				setSettings({
					latitude: latitude ? Number.parseFloat(latitude) : 40.7128,
					longitude: longitude ? Number.parseFloat(longitude) : -74.006,
					method: method ? Number.parseInt(method) : 2,
				});
			} catch (err) {
				console.error("Error loading prayer settings:", err);
			}
		};

		loadSettings();
	}, []);

	// Fetch prayer times when settings change
	useEffect(() => {
		const fetchPrayerTimes = async () => {
			try {
				setLoading(true);
				const today = new Date();
				const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

				const response = await fetch(
					`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${settings.latitude}&longitude=${settings.longitude}&method=${settings.method}`,
				);

				if (!response.ok) {
					throw new Error("Failed to fetch prayer times");
				}

				const data: PrayerTimesResponse = await response.json();

				// Convert prayer times to Date objects
				const times: PrayerTime[] = [
					{ name: "Fajr", time: convertToDate(data.data.timings.Fajr) },
					{ name: "Sunrise", time: convertToDate(data.data.timings.Sunrise) },
					{ name: "Dhuhr", time: convertToDate(data.data.timings.Dhuhr) },
					{ name: "Asr", time: convertToDate(data.data.timings.Asr) },
					{ name: "Maghrib", time: convertToDate(data.data.timings.Maghrib) },
					{ name: "Isha", time: convertToDate(data.data.timings.Isha) },
				];

				setPrayerTimes(times);
				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unknown error occurred",
				);
				setLoading(false);
			}
		};

		fetchPrayerTimes();
	}, [settings]);

	// Set up interval to update the time until next prayer
	useEffect(() => {
		// Call immediately when prayer times are available
		if (prayerTimes.length > 0) {
			updateNextPrayer();
		}
		
		const intervalId = setInterval(updateNextPrayer, 1000);
		return () => clearInterval(intervalId);
	}, [prayerTimes]);

	// Helper function to convert time string to Date object
	const convertToDate = (timeStr: string): Date => {
		const today = new Date();
		const [hours, minutes] = timeStr.split(":").map(Number);

		const date = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			hours,
			minutes,
		);

		return date;
	};

	// Update the next prayer and time until next prayer
	const updateNextPrayer = () => {
		if (prayerTimes.length === 0) return;

		const now = new Date();

		// Find the next prayer
		let next: PrayerTime | null = null;

		for (const prayer of prayerTimes) {
			if (prayer.time > now) {
				next = prayer;
				break;
			}
		}

		// If no next prayer found, it means all prayers for today have passed
		if (!next && prayerTimes.length > 0) {
			// Use the first prayer of tomorrow
			const tomorrowFajr = { ...prayerTimes[0] };
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			tomorrowFajr.time = new Date(
				tomorrow.getFullYear(),
				tomorrow.getMonth(),
				tomorrow.getDate(),
				tomorrowFajr.time.getHours(),
				tomorrowFajr.time.getMinutes(),
			);
			next = tomorrowFajr;
		}

		// Only update if the next prayer has changed
		if (next && next.name !== lastUpdatedPrayer) {
			console.log('Next prayer:', next.name, 'at', next.time.toLocaleTimeString());
			setLastUpdatedPrayer(next.name);
			setNextPrayer(next);

			// Calculate time until next prayer
			const diffMs = next.time.getTime() - now.getTime();
			const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
			const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

			setTimeUntilNextPrayer(
				`${diffHrs.toString().padStart(2, "0")}:${diffMins.toString().padStart(2, "0")}`,
			);
		}
	};

	return {
		prayerTimes,
		nextPrayer,
		timeUntilNextPrayer,
		loading,
		error,
	};
}
