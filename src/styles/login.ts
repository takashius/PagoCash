import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  form: {
    marginTop: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#007bff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  registerPrompt: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginTop: 20,
  },
  registerLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default loginStyles;
