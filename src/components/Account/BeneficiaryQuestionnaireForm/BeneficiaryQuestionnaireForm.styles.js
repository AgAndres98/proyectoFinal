import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
      contentAdentro:{
        marginTop: 20,
        marginLeft: 10,
        marginHorizontal: 20,
    },
    selectDeObjeto: {
      color: "grey",
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      sectionObjetos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 100
      },
      sectionElectrodomesticos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 63
      },
      sectionOtros: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
      },
      paragraph: {
        fontSize: 15,
      },
      checkbox: {
        margin: 8,
      },
      titulo: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 7,
    },
    tituloNecesidad: {
      fontWeight: "bold",
      fontSize: 15,
      marginBottom: 15,
      marginLeft: 7,
  },
  viewImage: {
    flexDirection: "row",
    marginHorizontal: 20,
},
containerIcon: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#62bd60",
    width: 70,
    height: 70,
},
error: {
    marginHorizontal: 20,
    marginTop: 10,
    color: "#ff0000",
    fontSize: 12,
    paddingLeft: 6,
},
imagenStyle: {
    width: 70,
    height: 70,
    marginLeft: 10,
},
});