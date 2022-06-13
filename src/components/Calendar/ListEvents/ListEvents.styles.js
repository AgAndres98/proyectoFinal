import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  infoContent: {
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  fecha: {
    fontSize: 18,
    color: "#828282",
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 15,
    top: -30,
    left: 25,
  },
  direccion: {
    fontSize: 18,
    color: "#828282",
  },
  descripcion: {
    fontSize: 18,
  },
  direccionContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
