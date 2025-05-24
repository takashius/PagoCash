import { StyleSheet } from "react-native";

const registerStyles = StyleSheet.create({
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "transparent",
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
});

export default registerStyles;
