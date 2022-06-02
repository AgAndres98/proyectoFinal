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
    justifyContent: "space-evenly",
    color: "#F4F4FC",
  },
  objeto: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  informacion: {
    flexDirection: "row",
    //backgroundColor: "#21bd20",
  },
  switchView: {
    width: 180,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: -15,
    //paddingLeft: 140,
    //backgroundColor: "#62bd20",
  },
  image: {
    width: 100,
    height: 140,
    margin: 15,
    borderRadius: 10,
    paddingLeft: 30,
  },
  iconosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    justifyContent: "space-between",
    marginBottom: 10,
    //backgroundColor: "#92bd60",
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
    borderColor: "#F02B2F",
    borderRadius: 10,
  },
  eye: {
    borderWidth: 1,
    borderColor: "#62BD60",
    borderRadius: 10,
  },
  edit: {
    borderWidth: 1,
    borderColor: "#8073BD",
    borderRadius: 10,
  } /*,
  switch: {
    marginTop: -80,
  },
  iconContainer: {
    marginRight: 0,
    marginTop: 70,
  },

  delete: {
    marginRight: -90,
    marginTop: -37,
  },
  eye: {
    marginRight: -180,
    marginTop: -35,
  },
  */,
});
