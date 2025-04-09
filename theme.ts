import { Platform } from "react-native";

export const theme = {
	colors: {
		background: "rgba(37, 37, 46, 1)",
		text: "rgba(241, 241, 244, 1)",
		primaryAccent: "rgb(102, 61, 235)",
		secondaryAccent: "rgb(130,114,240)",
		tertiaryAccent: "rgb(200,185,248)",
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
};

export const tabBarStyle = Platform.select({
	web: {
		backgroundColor: theme.colors.background,
		borderTopColor: theme.colors.background,
		borderTopWidth: 1,
		height: 60,
		paddingBottom: 8,
	},
	default: {
		backgroundColor: theme.colors.background,
		borderTopColor: theme.colors.background,
		borderTopWidth: 1,
		height: 60,
		paddingBottom: 8,
	},
});
