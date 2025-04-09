import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
	useRef,
	useMemo,
	useCallback,
	useEffect,
	useState,
} from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { theme } from "../theme";
import { Sunrise } from "lucide-react-native";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { useFonts } from "expo-font";

export default function ClockPage() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const insets = useSafeAreaInsets();
	const { prayerTimes } = usePrayerTimes();
	const [fontsLoaded] = useFonts({
		"Geist-Regular": require("../assets/fonts/Geist-Regular.ttf"),
	});

	// Calculate sunrise rotation based on prayer times
	const sunriseRotation = useMemo(() => {
		if (!prayerTimes?.length) return 0;
		const sunrise = prayerTimes.find((prayer) => prayer.name === "Sunrise");
		if (!sunrise) return 0;
		const hours = sunrise.time.getHours();
		const minutes = sunrise.time.getMinutes();
		// Convert to degrees on 24hr clock
		return hours * 15 + minutes * 0.25;
	}, [prayerTimes]);

	const [rotation, setRotation] = useState(() => {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		return hours * 15 + minutes * 0.25;
	});

	useEffect(() => {
		NavigationBar.setBackgroundColorAsync("#12123b");
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const hours = now.getHours();
			const minutes = now.getMinutes();
			setRotation(hours * 15 + minutes * 0.25);
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	// Modify the snapPoints to change the starting height
	const snapPoints = useMemo(() => ["19%", "82%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleSheetAnimate = useCallback(
		(fromIndex: number, toIndex: number) => {
			console.log(`Animating from index ${fromIndex} to ${toIndex}`);
		},
		[],
	);

	// Set the navigation bar color when the component mounts

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: "#25252D" }}>
			<StatusBar hidden={true} />

			<View style={[styles.pageContent, { paddingTop: 0 }]}>
				<View style={styles.circle}>
					{/* Hour Numbers */}
					<View style={[styles.hourNumber, { transform: [{ translateY: -115 }] }]}>
						<Text style={styles.hourText}>0</Text>
					</View>
					<View style={[styles.hourNumber, { transform: [{ translateX: 115 }] }]}>
						<Text style={styles.hourText}>6</Text>
					</View>
					<View style={[styles.hourNumber, { transform: [{ translateY: 115 }] }]}>
						<Text style={styles.hourText}>12</Text>
					</View>
					<View style={[styles.hourNumber, { transform: [{ translateX: -115 }] }]}>
						<Text style={styles.hourText}>18</Text>
					</View>

					{/* Hour and Minute Ticks */}
					{[...Array(144)].map((_, i) => {
						const isHourTick = i % 6 === 0; // Every 6th tick (24 total for hours)
						const rotation = i * 2.5; // 360 / 144 = 2.5 degrees per tick
						return (
							<View
								key={`tick-${rotation}`}
								style={[
									styles.tickMark,
									isHourTick ? styles.hourTick : styles.minuteTick,
									{
										transform: [
											{ rotate: `${rotation}deg` },
											{ translateY: -132 },
										],
									},
								]}
							/>
						);
					})}

					{/* Sunrise Icon */}
					<View
						style={[
							styles.iconContainer,
							{
								transform: [
									{ rotate: `${sunriseRotation}deg` },
									{ translateY: -150 }, // Position near the edge of circle
								],
							},
						]}
					>
						<View
							style={{
								transform: [
									// Counter-rotate the icon to keep it upright
									{ rotate: `${-sunriseRotation}deg` },
								],
							}}
						>
							<Sunrise size={16} color={theme.colors.primaryAccent} />
						</View>
					</View>

					<View
						style={[
							styles.clockHandContainer,
							{
								transform: [
									{ translateX: 0 },
									{ translateY: -95 },
									{ rotate: `${rotation}deg` },
								],
							},
						]}
					>
						<View style={styles.clockHandPointer} />
						<View style={styles.clockHandBase} />
					</View>
				</View>
			</View>

			<BottomSheet
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				// onChange={handleSheetChanges}
				// onAnimate={handleSheetAnimate}
				backgroundStyle={styles.bottomSheetBackground}
				handleIndicatorStyle={{
					backgroundColor: theme.colors.primaryAccent,
					width: 30,
					height: 4,
					opacity: 0.5,
				}}
				enablePanDownToClose={false}
				animateOnMount={true}
				android_keyboardInputMode="adjustResize"
				enableOverDrag={true}
				detached={false}
				bottomInset={0}
				style={{ zIndex: 999999 }} //max z-index lol :]
			>
				<BottomSheetView style={styles.bottomSheetContentView}>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.bottomSheetText}>time.</Text>
					</View>
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	pageContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	circle: {
		width: 340,
		height: 340,
		borderRadius: 200,
		backgroundColor: "#25252D",
		justifyContent: "center",
		alignItems: "center",
		boxShadow:
			"-6px -6px 16px rgba(255, 255, 255, .11), 6px 6px 16px rgba(0, 0, 0, 0.39), inset 6px 6px 16px rgba(0, 0, 0, 0.39), inset -6px -6px 16px rgba(255, 255, 255, 0.11)",
	},
	clockHandContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		height: 190,
		width: 2,
		transform: [{ translateX: 0 }, { translateY: -95 }],		
		alignItems: "center",
	},
	clockHandPointer: {
		transform: [{ translateX: 0 }, { translateY: -22 }],
		position: "absolute",
		top: 0,
		width: 0,
		height: 0,
		backgroundColor: "transparent",
		borderStyle: "solid",
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderBottomWidth: 136,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderBottomColor: theme.colors.primaryAccent,
	},
	clockHandBase: {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: 12,
		height: 12,
		borderRadius: 6,
		transform: [{ translateX: -6 }, { translateY: -6 }],
		backgroundColor: theme.colors.primaryAccent,
		zIndex: 1,
	},
	bottomSheetBackground: {
		backgroundColor: "rgba(37, 37, 46, 1)",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 8,
	},
	bottomSheetContentView: {
		flex: 1,
		padding: 20,
		backgroundColor: "transparent",
	},
	bottomSheetText: {
		fontSize: 16,
		color: theme.colors.secondaryAccent,
		fontFamily: "Geist-Regular",
	},
	iconContainer: {
		position: "absolute",
		left: "50%",
		top: "50%",
		width: 24,
		height: 24,
		marginLeft: -12,
		marginTop: -12,
		justifyContent: "center",
		alignItems: "center",
	},
	tickMark: {
		position: "absolute",
		left: "50%",
		height: 5,
		backgroundColor: "#12121b",
		marginLeft: -1,
	},
	hourTick: {
		width: 1.5,
		backgroundColor: theme.colors.secondaryAccent,
	},
	minuteTick: {
		width: 1,
		backgroundColor: "rgba(241, 241, 244, 0.15)",
	},
	hourNumber: {
		position: "absolute",
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: "rgba(37, 37, 46, 1)",
		justifyContent: "center",
		alignItems: "center",
		boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.39), inset -1px -1px 1px rgba(255, 255, 255, 0.11)",
	},
	hourText: {
		fontSize: 12,
		fontWeight: "bold",
		fontFamily: "Inter",
		color: theme.colors.secondaryAccent,
	},
});
