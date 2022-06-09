import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F4F4FC",
  },
  imageContainer: {
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  content: {
    marginHorizontal: 20,
  },
  textRegister: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  btnRegister: {
    color: "#62bd60",
    fontWeight: "bold",
  },
});
