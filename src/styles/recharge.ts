import { StyleSheet } from "react-native";

const rechargeStyles = StyleSheet.create({
  confirmationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  balance: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  inputGroup: {
    marginBottom: 20,
  },
  input_amount: {
    textAlign: "right",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputPrefix: {
    position: "absolute",
    left: 10,
    fontSize: 16,
    color: "#555",
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentCard: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedPaymentCard: {
    borderColor: "#007bff",
    backgroundColor: "#E9F7EF",
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    color: "#555",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successIcon: {
    backgroundColor: "#E9F7EF",
    borderRadius: 50,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: "100%",
  },
  detailsRow: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  detailsLabel: {
    fontWeight: "bold",
  },
  snackbar: {
    backgroundColor: "#FF6F61",
  },
});

export default rechargeStyles;
