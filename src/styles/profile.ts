import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profileDetails: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileID: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  profileInfoSection: {
    marginTop: 15,
    marginBottom: 20,
  },
  profileInfoLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 3,
  },
  profileInfoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#ff7f50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default profileStyles;
