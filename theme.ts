import { Platform } from "react-native";

export const theme = {
	colors: {
		background: "#000000",
		text: "#DCE3EA",
		primaryAccent: "#43AAF9",
		secondaryAccent: "#f75f8f",
		success: "#62c073",
		functionPurple: "#bf7af0",
		subtleGray: "#454d54",
		error: "#E61F44",
		white: "#FFFFFF",
		commentGray: "#888888",
		darkOverlay: "#0A0A0A",
		widgetBackground: "#34393E",
		selectionTint: "#43AAF955",
		focusTint: "#f75f8f55",
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
		backgroundColor: theme.colors.darkOverlay,
		borderTopColor: theme.colors.subtleGray,
		borderTopWidth: 1,
		height: 60,
		paddingBottom: 8,
	},
	default: {
		backgroundColor: theme.colors.darkOverlay,
		borderTopColor: theme.colors.subtleGray,
		borderTopWidth: 1,
		height: 60,
		paddingBottom: 8,
	},
});
