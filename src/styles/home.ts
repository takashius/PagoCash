import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  balanceLabel: {
    textAlign: "center",
    color: "#555",
  },
  balance: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  accountNumber: {
    textAlign: "center",
    color: "#777",
  },
});

export default homeStyles;
