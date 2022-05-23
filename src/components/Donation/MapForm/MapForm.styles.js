import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mapStyle: {
      width: "100%",
      height: 550,
  },
  mapActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btnMapContainerGuardar: {
    paddingRight: 5,
    width: "50%",
  },
  btnMapContainerCerrar:{
    paddingLeft: 5,
    width: "50%",
  },
  btnMapGuardar: {
    backgroundColor: "#62bd60",
  },
  btnMapCerrar: {
    backgroundColor: "#8073BD",
  }
});