import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { theme } from "../theme";

export default function ClockPage() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const insets = useSafeAreaInsets();
	const [rotation, setRotation] = useState(() => {
		const now = new Date();
		const hours = now.getHours() % 12;
		const minutes = now.getMinutes();
		// Calculate initial rotation: (hour * 30) + (minutes * 0.5)
		// 30 degrees per hour (360/12), 0.5 degrees per minute (30/60)
		return (hours * 30) + (minutes * 0.5);
	});

	useEffect(() => {
		NavigationBar.setBackgroundColorAsync("#121212");
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const hours = now.getHours() % 12;
			const minutes = now.getMinutes();
			// Update rotation based on current hour and minute
			setRotation((hours * 30) + (minutes * 0.5));
		}, 60000); // Update every minute

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
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000000" }}>
			<StatusBar hidden={true} />

			<View style={[styles.pageContent, { paddingTop: 0 }]}>
				<View style={styles.circle}>
					<View 
						style={[
							styles.clockHandContainer,
							{ transform: [
								{ translateX: 0 },
								{ translateY: -95 },
								{ rotate: `${rotation}deg` }
							]}
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
				enablePanDownToClose={false} // Prevent closing by swiping down
				animateOnMount={true} // Animate when component mounts
				android_keyboardInputMode="adjustResize" // Better keyboard handling on Android
				enableOverDrag={true}
				detached={false}
				bottomInset={0}
				style={{ zIndex: 99000 }}
			>
				<BottomSheetView style={styles.bottomSheetContentView}>
					<Text style={styles.bottomSheetText}>stuff inside sheet</Text>
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
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2.25,
		borderColor: theme.colors.primaryAccent,
		shadowRadius: 20,
		elevation: 10,
	},
	clockHandContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		height: 190,
		width: 2,
		transform: [
			{ translateX: 0 },
			{ translateY: -95 },
		],
		alignItems: "center",
	},
	clockHandPointer: {
		transform: [
			{ translateX: 0 },
			{ translateY: -60 },
		],
		position: 'absolute',
		top: 0,
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderBottomWidth: 150,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: theme.colors.functionPurple,
	},
	clockHandBase: {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: 12,
		height: 12,
		borderRadius: 6,
		transform: [
			{ translateX: -6 },
			{ translateY: -6 },
		],
		backgroundColor: theme.colors.functionPurple,
		zIndex: 1,
	},
	bottomSheetBackground: {
		backgroundColor: "#121212",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	bottomSheetContentView: {
		flex: 1,
		padding: 20,
		backgroundColor: "#121212",
	},
	bottomSheetText: {
		fontSize: 16,
		color: "white",
	},
});
