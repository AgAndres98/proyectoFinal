import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  image: {
    margin: 5,
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  infoContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  fecha: {
    /*

    textAlign: "right",
*/
    fontSize: 18,
    fontWeight: "light",
    color: "#828282",
    position: "absolute",
    backgroundColor: "#F4F4FC",
    borderRadius: 50,
    padding: 15,
    top: -40,
    left: 25,
  },
  direccion: {
    fontSize: 18,
    fontWeight: "light",
    color: "#828282",
  },
  descripcion: {
    fontSize: 18,
    fontWeight: "light",
  },
  direccionContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
