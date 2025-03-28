import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { theme } from "../theme";

export default function ClockPage() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const insets = useSafeAreaInsets();

	useEffect(() => {
		NavigationBar.setBackgroundColorAsync(theme.colors.accents_1);
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

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<StatusBar hidden={true} />

			<View style={[styles.pageContent, { paddingTop: 0 }]}>
				<Text
					style={{ color: theme.colors.text, fontFamily: "Geist-Regular", fontSize: 20 }}
				>
					Home Page
				</Text>
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
	bottomSheetBackground: {
		backgroundColor: theme.colors.accents_1,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	bottomSheetContentView: {
		flex: 1,
		padding: 20,
		backgroundColor: theme.colors.accents_1,
	},
	bottomSheetText: {
		fontSize: 16,
		color: theme.colors.text,
	},
});
