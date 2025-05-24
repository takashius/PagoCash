import { StyleSheet } from "react-native";

const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  containerTop: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContainer: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    width: "100%",
    padding: 10,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  card: {
    width: "48%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  qrContainer: {
    padding: 20,
  },
});

export default generalStyles;
