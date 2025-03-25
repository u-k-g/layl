import { View, Text, StyleSheet } from "react-native";
import { Clock, Compass, Calendar, Settings } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { ChevronLeft } from "lucide-react-native";

const NAVBAR_HEIGHT = 0;

export default function App() {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View style={styles.verticalLine} />
			<View
				style={[
					styles.navbar,
					{
						height: NAVBAR_HEIGHT + insets.top,
						paddingTop: insets.top,
					},
				]}
			>
				<View style={styles.centeredIcons}>
					<Clock color="#fff" size={24} />
					<Compass color="#fff" size={24} />
					<Calendar color="#fff" size={24} />
					<Settings color="#fff" size={24} />
				</View>
				<View style={styles.rightIcon}>
					<ChevronLeft color="#fff" size={24} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
	},
	verticalLine: {
		position: "absolute",
		left: "50%",
		right: "50%",
		top: 0,
		bottom: 0,
		width: 1,
		backgroundColor: "rgba(255, 255, 255, 1)",
		zIndex: 100,
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
	},
	centeredIcons: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 40,
		position: "absolute", // Add absolute positioning
		left: 0,
		right: 0,
		alignItems: "center", // Ensure vertical centering
	},
	rightIcon: {
		right: 16,
    position:'absolute'
	},
});
