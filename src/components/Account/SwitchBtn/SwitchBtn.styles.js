import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F4F4FC",
    width: "100%",
    height: "100%",
  },
  objetoContainer: {
    flexDirection: "column",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  objeto: {
    flexDirection: "row",
  },
  container: {
    marginTop: 15,
    width: "50%",
  },
  switchView: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 160,
    margin: 15,
    borderRadius: 10,
  },
  descripcionContainer: {},
  iconosContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    marginBottom: 30,
  },
  delete: {
    borderWidth: 1,
    borderColor: "#BD2225",
    borderRadius: 10,
    padding: 5,
  },
  eye: {
    borderWidth: 1,
    borderColor: "#8073BD",
    borderRadius: 10,
    padding: 5,
  },
  edit: {
    borderWidth: 1,
    borderColor: "#8073BD",
    borderRadius: 10,
    padding: 5,
  },
  content: {
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    marginTop: 5,
  },
  btnSolicitudes: {
    borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    backgroundColor: "#62BD60",
  },
});
