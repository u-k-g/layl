import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../theme";

export default function ClockPage() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const insets = useSafeAreaInsets();
	const [latitude, setLatitude] = useState<string>("38.9963");
	const [longitude, setLongitude] = useState<string>("-77.4468");
	const [calculationMethod, setCalculationMethod] = useState<string>("2");
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string | null>(null);

	useEffect(() => {
		NavigationBar.setBackgroundColorAsync(theme.colors.accents_1);

		// Load saved settings
		const loadSettings = async () => {
			try {
				const savedLatitude = await AsyncStorage.getItem("prayer_latitude");
				const savedLongitude = await AsyncStorage.getItem("prayer_longitude");
				const savedMethod = await AsyncStorage.getItem(
					"prayer_calculation_method",
				);

				if (savedLatitude) setLatitude(savedLatitude);
				if (savedLongitude) setLongitude(savedLongitude);
				if (savedMethod) setCalculationMethod(savedMethod);
			} catch (error) {
				console.error("Failed to load settings:", error);
			}
		};

		loadSettings();
	}, []);

	// Modify the snapPoints to change the starting height
	const snapPoints = useMemo(() => ["19%", "82%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const saveSettings = async () => {
		try {
			setIsSaving(true);
			await AsyncStorage.setItem("prayer_latitude", latitude);
			await AsyncStorage.setItem("prayer_longitude", longitude);
			await AsyncStorage.setItem(
				"prayer_calculation_method",
				calculationMethod,
			);

			setSaveMessage("Settings saved successfully!");
			setTimeout(() => setSaveMessage(null), 3000);
		} catch (error) {
			setSaveMessage("Failed to save settings");
			console.error("Failed to save settings:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const calculationMethods = [
		{ id: "0", name: "Shia Ithna-Ashari" },
		{ id: "1", name: "University of Islamic Sciences, Karachi" },
		{ id: "2", name: "Islamic Society of North America" },
		{ id: "3", name: "Muslim World League" },
		{ id: "4", name: "Umm Al-Qura University, Makkah" },
		{ id: "5", name: "Egyptian General Authority of Survey" },
		{ id: "7", name: "Institute of Geophysics, University of Tehran" },
		{ id: "8", name: "Gulf Region" },
		{ id: "9", name: "Kuwait" },
		{ id: "10", name: "Qatar" },
		{ id: "11", name: "Majlis Ugama Islam Singapura, Singapore" },
		{ id: "12", name: "Union Organization Islamic de France" },
		{ id: "13", name: "Diyanet İşleri Başkanlığı, Turkey" },
		{ id: "14", name: "Spiritual Administration of Muslims of Russia" },
		{ id: "15", name: "Moonsighting Committee Worldwide" },
		{ id: "16", name: "Dubai (unofficial)" },
	];

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			{/* Add StatusBar to ensure UI starts above camera cutout */}
			<StatusBar hidden={true} />

			<View style={[styles.pageContent, { paddingTop: 0 }]}>
				<Text
					style={{ color: theme.colors.text, fontFamily: "Geist-Regular", fontSize: 20 }}
				>
					Settings
				</Text>
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
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text style={styles.sectionTitle}>Prayer Times Settings</Text>

						<Text style={styles.inputLabel}>Latitude</Text>
						<TextInput
							style={styles.input}
							value={latitude}
							onChangeText={setLatitude}
							placeholder="Enter latitude"
							placeholderTextColor={theme.colors.accents_4}
							keyboardType="numeric"
						/>

						<Text style={styles.inputLabel}>Longitude</Text>
						<TextInput
							style={styles.input}
							value={longitude}
							onChangeText={setLongitude}
							placeholder="Enter longitude"
							placeholderTextColor={theme.colors.accents_4}
							keyboardType="numeric"
						/>

						<Text style={styles.inputLabel}>Calculation Method</Text>
						<View style={styles.methodContainer}>
							{calculationMethods.map((method) => (
								<TouchableOpacity
									key={method.id}
									style={[
										styles.methodButton,
										calculationMethod === method.id &&
											styles.selectedMethodButton,
									]}
									onPress={() => setCalculationMethod(method.id)}
								>
									<Text
										style={[
											styles.methodButtonText,
											calculationMethod === method.id &&
												styles.selectedMethodButtonText,
										]}
									>
										{method.name}
									</Text>
								</TouchableOpacity>
							))}
						</View>

						<TouchableOpacity
							style={styles.saveButton}
							onPress={saveSettings}
							disabled={isSaving}
						>
							<Text style={styles.saveButtonText}>
								{isSaving ? "Saving..." : "Save Settings"}
							</Text>
						</TouchableOpacity>

						{saveMessage && (
							<Text style={styles.saveMessage}>{saveMessage}</Text>
						)}
					</ScrollView>
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
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		color: theme.colors.text,
		fontFamily: "Geist-Regular",
	},
	inputLabel: {
		fontSize: 16,
		marginBottom: 8,
		color: theme.colors.accents_6,
		fontFamily: "Geist-Regular",
	},
	input: {
		backgroundColor: theme.colors.accents_2,
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		color: theme.colors.text,
		fontFamily: "Geist-Regular",
	},
	methodContainer: {
		marginTop: 8,
		marginBottom: 24,
	},
	methodButton: {
		backgroundColor: theme.colors.accents_2,
		borderRadius: 8,
		padding: 12,
		marginBottom: 8,
	},
	selectedMethodButton: {
		backgroundColor: theme.colors.primaryAccent,
	},
	methodButtonText: {
		color: theme.colors.text,
		fontFamily: "Geist-Regular",
	},
	selectedMethodButtonText: {
		color: theme.colors.foreground,
		fontWeight: "bold",
	},
	saveButton: {
		backgroundColor: theme.colors.success,
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		marginTop: 16,
		marginBottom: 40,
	},
	saveButtonText: {
		color: theme.colors.foreground,
		fontSize: 16,
		fontWeight: "bold",
		fontFamily: "Geist-Regular",
	},
	saveMessage: {
		textAlign: "center",
		marginTop: 16,
		color: theme.colors.success,
		fontSize: 16,
		fontFamily: "Geist-Regular",
	},
});
