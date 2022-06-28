import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content:{
      backgroundColor: "#fff",
      marginVertical: 10,
      marginHorizontal: 15,
      borderWidth: 2,
      borderColor: "#8073BD",
      borderRadius: 10,
  },
  contentAdentro:{
      marginTop: 3,
      marginLeft: 10,
      marginHorizontal: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 5,
    marginBottom: 10,
  },
  btn: {
     backgroundColor: "#62bd60",
  },
  textoSelect: {
    marginLeft: 8,
    //color: "grey",
    color: "black",
  },
  selectDeObjeto: {
    borderWidth: 20,
    color: "grey",
  },
  hiddenInput: {
    width: 0,
    height: 0,
    display:"none",
  },
  showInput: {
    width: 0,
    height: 0,
   
  }
});