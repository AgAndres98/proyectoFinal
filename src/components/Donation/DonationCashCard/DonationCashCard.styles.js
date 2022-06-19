import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  contentAdentro: {
    marginTop: 3,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#696975",
  },
  subtitle: {
    fontSize: 11,
    color: "#696975",
  },
  separador: {
    borderBottomColor: "#C0CCDA",
    borderBottomWidth: 0.5,
    marginRight: 5,
  },
  titleText: {
    fontSize: 18,
    color: "#696975",
    marginTop: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#62bd60",
    borderRadius: 10,
  },

  viewContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  icon: {
    alignSelf: "flex-end",
  },
});
