import { StyleSheet } from "react-native";

const passwordRecoveryStyles = StyleSheet.create({
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
    textAlign: "center",
  },
  form: {
    marginTop: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  backToLogin: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginTop: 20,
  },
  backToLoginLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default passwordRecoveryStyles;
