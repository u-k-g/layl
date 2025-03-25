import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function QiblaScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Qibla Direction</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		padding: theme.spacing.md,
	},
	text: {
		color: theme.colors.text,
		fontSize: 24,
		fontWeight: "600",
	},
});
