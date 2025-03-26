import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from "expo-navigation-bar";

export default function ClockPage() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const insets = useSafeAreaInsets();

  useEffect(() => {
		NavigationBar.setBackgroundColorAsync('#121212');
	}, []);

	// Modify the snapPoints to change the starting height
	const snapPoints = useMemo(() => ['19%', '82%'], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	const handleSheetAnimate = useCallback(
		(fromIndex: number, toIndex: number) => {
			console.log(`Animating from index ${fromIndex} to ${toIndex}`);
		},
		[],
	);

	// Set the navigation bar color when the component mounts


	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000000' }}>
			{/* Add StatusBar to ensure UI starts above camera cutout */}
      <StatusBar hidden={true} />

			<View style={[styles.pageContent, { paddingTop: 0 }]}>
				<Text style={{ color: 'white', fontFamily:"Geist-Regular", fontSize: 20 }}>Settings</Text>
			</View>

			<BottomSheet
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
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
					<Text style={styles.bottomSheetText}>
						stuff inside sheet
					</Text>
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	pageContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomSheetBackground: {
		backgroundColor: '#121212',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	bottomSheetContentView: {
		flex: 1,
		padding: 20,
		backgroundColor: '#121212',
	},
	bottomSheetText: {
		fontSize: 16,
		color: 'white',
	},
});
