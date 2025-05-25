import { StyleSheet } from "react-native";

const transferStyles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
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
  balanceInfo: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  balance: {
    fontWeight: "bold",
    color: "#007bff",
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentMethod: {
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
  selectedMethod: {
    borderColor: "#007bff",
    backgroundColor: "#E9F7EF",
  },
  methodText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    color: "#555",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  contactDetails: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contactAccount: {
    fontSize: 14,
    color: "#777",
  },
  summaryCard: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  summaryLabel: {
    fontWeight: "bold",
    color: "#333",
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
    marginLeft: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconAndTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginLeft: 8,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  modalMessage: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginVertical: 15,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
  },
  selectedContactCard: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "transparent",
  },
  searchIcon: {
    marginLeft: 5,
  },
});

export default transferStyles;
