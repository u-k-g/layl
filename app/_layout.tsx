import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { Slot } from "expo-router";
import { View, StyleSheet, Pressable, Text, Platform } from "react-native";
import {
	Clock,
	Compass,
	Calendar,
	Settings,
	ChevronUp,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import Animated, {
	useAnimatedStyle,
	withTiming,
	withSpring,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { theme } from "../theme";

const NAVBAR_HEIGHT = 0;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Layout() {
	useFrameworkReady();
	const router = useRouter();
	const [themeType, setThemeType] = useState('dark');

	useEffect(() => {
		if (Platform.OS === 'web') {
			NavigationBar.setBackgroundColorAsync(theme.colors.accents_1);
		}
	}, []);

	<StatusBar hidden={true} />


	const [fontsLoaded] = useFonts({
		"Geist-Regular": require("../assets/fonts/Geist-Regular.ttf"),
	});

	const insets = useSafeAreaInsets();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [currentTime, setCurrentTime] = useState("");
	const [selectedIcon, setSelectedIcon] = useState<string | null>("Clock");
	const { timeUntilNextPrayer } = usePrayerTimes();
	const animation = useSharedValue(0);

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const hours = now.getHours();
			const minutes = now.getMinutes();
			const formattedHours = hours % 12 || 12;
			const formattedMinutes = minutes.toString().padStart(2, "0");
			setCurrentTime(`${formattedHours}:${formattedMinutes}`);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	const iconStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(animation.value, [0, 1], [1, 0]),
			transform: [
				{ translateY: interpolate(animation.value, [0, 1], [0, -20]) },
			],
		};
	});

	const timeStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(animation.value, [0, 1], [0, 1]),
			transform: [
				{ translateY: interpolate(animation.value, [0, 1], [20, 0]) },
			],
		};
	});

	const chevronStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ rotate: `${interpolate(animation.value, [0, 1], [-90, -180])}deg` },
			],
		};
	});

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
		animation.value = withSpring(isCollapsed ? 0 : 1, {
			damping: 15,
			stiffness: 100,
		});
	};

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GeistProvider themeType={themeType}>
			<CssBaseline />
			<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
				<View
					style={[
						styles.navbar,
						{
							height: NAVBAR_HEIGHT + insets.top,
							paddingTop: insets.top,
						},
					]}
				>
					<Animated.View style={[styles.centeredIcons, iconStyle]}>
						<Pressable
							onPress={() => {
								setSelectedIcon("Clock");
								console.log("Clock selected");
								router.push("/");
							}}
						>
							{selectedIcon === "Clock" && <View style={styles.highlightOval} />}
							<Clock color={theme.colors.text} size={24} />
						</Pressable>
						<Pressable
							onPress={() => {
								setSelectedIcon("Compass");
								console.log("Compass selected");
								router.push("/compass");
							}}
						>
							{selectedIcon === "Compass" && (
								<View style={styles.highlightOval} />
							)}
							<Compass color={theme.colors.text} size={24} />
						</Pressable>
						<Pressable
							onPress={() => {
								setSelectedIcon("Calendar");
								console.log("Calendar selected");
								router.push("/calendar");
							}}
						>
							{selectedIcon === "Calendar" && (
								<View style={styles.highlightOval} />
							)}
							<Calendar color={theme.colors.text} size={24} />
						</Pressable>
						<Pressable
							onPress={() => {
								setSelectedIcon("Settings");
								console.log("Settings selected");
								router.push("/settings");
							}}
						>
							{selectedIcon === "Settings" && (
								<View style={styles.highlightOval} />
							)}
							<Settings color={theme.colors.text} size={24} />
						</Pressable>
					</Animated.View>

					<Animated.View style={[styles.timeContainer, timeStyle]}>
						<Text style={styles.timeText}>{timeUntilNextPrayer}</Text>
					</Animated.View>

					<AnimatedPressable
						style={[styles.rightIcon, chevronStyle]}
						onPress={toggleCollapse}
					>
						<ChevronUp color={theme.colors.text} size={24} />
					</AnimatedPressable>
				</View>
				<Slot />
			</View>
		</GeistProvider>
	);
}

const styles = StyleSheet.create({
	navbar: {
		backgroundColor: "rgba(0, 0, 0, 0.0)",
		position: "absolute",
		top: 104,
		left: 0,
		right: 0,
		zIndex: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	centeredIcons: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%",
		height: 40,
		backgroundColor: theme.colors.accents_1,
		borderRadius: 20,
		paddingHorizontal: 10,
	},
	timeContainer: {
		position: "absolute",
		width: "80%",
		height: 40,
		backgroundColor: theme.colors.accents_1,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	timeText: {
		color: theme.colors.text,
		fontSize: 16,
		fontFamily: "Geist-Regular",
	},
	rightIcon: {
		position: "absolute",
		right: 20,
		backgroundColor: theme.colors.accents_1,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	highlightOval: {
		position: "absolute",
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: theme.colors.selectionTint,
		zIndex: -1,
	},
});