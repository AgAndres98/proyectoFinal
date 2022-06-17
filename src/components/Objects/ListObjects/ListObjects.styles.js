import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /*buscar: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderColor: "#62bd60",
    backgroundColor: "white",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },*/
  objeto: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 10,
  },
  informacion: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
  buscar: {
    flexDirection: "row",
    borderWidth: 0.5,
    marginTop: 15,
    marginBottom: 5,

    width: "90%",
    height: 50,
    borderColor: "#62bd60",
    backgroundColor: "white",
    marginHorizontal: 20,

    borderRadius: 10,
    alignItems: "center",
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
  },
  searchIcon: {
    paddingLeft: 10,
  },
});
