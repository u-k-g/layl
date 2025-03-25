import { useState } from "react";
import { Tabs } from "expo-router";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import {
	Clock,
	Compass,
	Calendar,
	Settings,
	ChevronLeft,
	ChevronDown,
} from "lucide-react-native";
import { theme, tabBarStyle } from "../theme";

export default function TabLayout() {
	const [isExpanded, setIsExpanded] = useState(true);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	const renderTabBar = ({ state, descriptors, navigation }) => {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.chevronButton} onPress={toggleExpanded}>
					{isExpanded ? (
						<ChevronLeft size={24} color={theme.colors.primaryAccent} />
					) : (
						<ChevronDown size={24} color={theme.colors.primaryAccent} />
					)}
				</TouchableOpacity>

				{isExpanded ? (
					<View style={styles.tabContainer}>
						{state.routes.map((route, index) => {
							const { options } = descriptors[route.key];
							const isFocused = state.index === index;

							const onPress = () => {
								const event = navigation.emit({
									type: "tabPress",
									target: route.key,
								});

								if (!isFocused && !event.defaultPrevented) {
									navigation.navigate(route.name);
								}
							};

							let icon: JSX.Element;
							switch (route.name) {
								case "index":
									icon = (
										<Clock
											size={24}
											color={
												isFocused
													? theme.colors.primaryAccent
													: theme.colors.subtleGray
											}
										/>
									);
									break;
								case "qibla":
									icon = (
										<Compass
											size={24}
											color={
												isFocused
													? theme.colors.primaryAccent
													: theme.colors.subtleGray
											}
										/>
									);
									break;
								case "calendar":
									icon = (
										<Calendar
											size={24}
											color={
												isFocused
													? theme.colors.primaryAccent
													: theme.colors.subtleGray
											}
										/>
									);
									break;
								case "settings":
									icon = (
										<Settings
											size={24}
											color={
												isFocused
													? theme.colors.primaryAccent
													: theme.colors.subtleGray
											}
										/>
									);
									break;
							}

							return (
								<TouchableOpacity
									key={route.key}
									onPress={onPress}
									style={styles.tab}
								>
									{icon}
								</TouchableOpacity>
							);
						})}
					</View>
				) : null}
			</View>
		);
	};

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			tabBar={renderTabBar}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Prayer Times",
				}}
			/>
			<Tabs.Screen
				name="qibla"
				options={{
					title: "Qibla",
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: "Calendar",
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: theme.colors.darkOverlay,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.subtleGray,
	},
	chevronButton: {
		padding: 8,
		marginRight: 16,
	},
	tabContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	tab: {
		padding: 8,
	},
	svgImage: {
		width: 120,
		height: 40,
		resizeMode: "contain",
	},
});
