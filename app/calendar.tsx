import { View, Text } from "react-native";

export default function CalendarPage() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#000000",
			}}
		>
			<Text style={{ color: "white", fontSize: 20 }}>Calendar</Text>
		</View>
	);
}
