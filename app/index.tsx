import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { theme } from "../theme";
// Import Linking explicitly to ensure it's properly initialized
import * as Linking from 'expo-linking';
import { Sheet } from "@tamagui/sheet";
import { YStack } from "tamagui";

export default function ClockPage() {
	const insets = useSafeAreaInsets();
	const [position, setPosition] = useState(0);

	useEffect(() => {
		NavigationBar.setBackgroundColorAsync(theme.colors.accents_1);
		
		// Initialize Linking to ensure it's available
		Linking.getInitialURL().catch(() => null);
	}, []);

	// Snap points equivalent to the previous ["19%", "82%"]
	const snapPoints = [19, 82];

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

			<Sheet
				modal={false}
				open
				snapPoints={snapPoints}
				position={position}
				onPositionChange={setPosition}
				dismissOnSnapToBottom={false}
				disableDrag={false}
				zIndex={99000}
				snapPointsMode="percent"
				// Using a simpler animation approach
				animationConfig={{
					type: 'spring',
					damping: 15,
					stiffness: 100,
				}}
			>
				<Sheet.Handle 
					opacity={1}
					backgroundColor={theme.colors.accents_1}
					height={6}
					width={40}
					borderRadius={3}
					marginTop={10}
				/>
				<Sheet.Frame
					backgroundColor={theme.colors.accents_1}
					borderTopLeftRadius={30}
					borderTopRightRadius={30}
					padding={0}
				>
					<YStack
						padding={20}
						backgroundColor={theme.colors.accents_1}
						flex={1}
					>
						<Text style={styles.bottomSheetText}>stuff inside sheet</Text>
					</YStack>
				</Sheet.Frame>
			</Sheet>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	pageContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomSheetText: {
		fontSize: 16,
		color: theme.colors.text,
		fontFamily: "Geist-Regular",
	},
});
