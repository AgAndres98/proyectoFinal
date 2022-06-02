import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F4F4FC",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "space-around",
  },
  objeto: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  image: {
    /*
    width: 180,
    height: 140,
    margin: 15,
    paddingRight: 10,
    borderRadius: 10,
    paddingLeft: 40,
    right: 30,
    */
    width: 180,
    height: 160,
    //margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,

    borderRadius: 10,
    paddingLeft: 30,
  },
  informacion: {
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    //right: 40,
    textDecorationLine: "underline",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    justifyContent: "space-between",
    marginBottom: 10,
    //backgroundColor: "#92bd60",
  },
  accept: {
    borderWidth: 1,
    borderColor: "#62BD60",
    borderRadius: 10,
    padding: 5,
  },
  delete: {
    borderWidth: 1,
    borderColor: "#F02B2F",
    borderRadius: 10,
    padding: 5,
  },
  eye: {
    borderWidth: 1,
    borderColor: "#8073BD",
    borderRadius: 10,
    padding: 5,
  },

  avatar: {
    marginRight: 0,
    backgroundColor: "green",
    borderRadius: 10,
  },

  containerIcons: {
    //right: 45,
  },
});
