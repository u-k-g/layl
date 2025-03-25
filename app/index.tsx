import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import {
	Clock,
	Compass,
	Calendar,
	Settings,
	ChevronDown,
	ChevronUp,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	withTiming,
	withSpring,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";

const NAVBAR_HEIGHT = 0;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App() {
	const insets = useSafeAreaInsets();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [currentTime, setCurrentTime] = useState("");
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

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

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
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
						}}
					>
						{selectedIcon === "Clock" && <View style={styles.highlightOval} />}
						<Clock color="#fff" size={24} />
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedIcon("Compass");
							console.log("Compass selected");
						}}
					>
						{selectedIcon === "Compass" && <View style={styles.highlightOval} />}
						<Compass color="#fff" size={24} />
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedIcon("Calendar");
							console.log("Calendar selected");
						}}
					>
						{selectedIcon === "Calendar" && <View style={styles.highlightOval} />}
						<Calendar color="#fff" size={24} />
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedIcon("Settings");
							console.log("Settings selected");
						}}
					>
						{selectedIcon === "Settings" && <View style={styles.highlightOval} />}
						<Settings color="#fff" size={24} />
					</Pressable>
				</Animated.View>

				<Animated.View style={[styles.timeContainer, timeStyle]}>
					<Text style={styles.timeText}>{currentTime}</Text>
				</Animated.View>

				<AnimatedPressable
					style={[styles.rightIcon, chevronStyle]}
					onPress={toggleCollapse}
				>
					<ChevronUp color="#fff" size={24} />
				</AnimatedPressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
	},
	navbar: {
		backgroundColor: "rgba(0, 0, 0, 0.0)",
		position: "absolute",
		top: 80,
		left: 0,
		right: 0,
		zIndex: 100,
		flexDirection: "row",
		paddingHorizontal: 16,
		height: 40,
	},
	centeredIcons: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 42,
		position: "absolute",
		left: 0,
		right: 0,
		alignItems: "center",
	},
	rightIcon: {
		position: "absolute",
		right: 16,
	},
	timeContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	timeText: {
		fontFamily: "Geist-Regular",
		color: "#fff",
		fontSize: 24,
	},
	scribbleContainer: {
		position: "absolute",
		top: NAVBAR_HEIGHT + 80,
		left: "50%",
		transform: [{ translateX: -50 }],
		alignItems: "center",
	},
	scribbleImage: {
		width: 100,
		height: 100,
	},
	highlightOval: {
		position: 'absolute',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		width: 50, // Adjust size as needed
		height: 32, // Adjust size as needed
		borderRadius: 50, // Half of width/height for oval shape
		zIndex: -1, // Ensure it's behind the icon
    top: '50%',      // Position the top edge at the vertical center of the Pressable
    left: '50%',     // Position the left edge at the horizontal center of the Pressable
    transform: [{ translateX: -25 }, { translateY: -16 }], // Shift it up and left by half of its width and height to truly center
	},
});
