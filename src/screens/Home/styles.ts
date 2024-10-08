import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: theme.colors.gray100,
  },
  glass: {
    width: "100%",
    height: 500,
    backgroundColor: theme.colors.blue90,
  },
  button: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
  },
  footer: {
    width: 120,
    height: 120,
    position: "absolute",
    bottom: 35,
  },
});
