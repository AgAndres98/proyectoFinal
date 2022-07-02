import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { Text, Image, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ListObjects.styles";
import { screen, db } from "../../../utils/";
import { LoadingModal } from "../../../components/Shared";
import { getDistance } from "geolib"

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function ListObjects(props) {
  const { objects } = props;
  const navigation = useNavigation();
  let objetos = [];

  const [objetosCompletos, setObjetosCompletos] = useState([]);
  const [search, setSearch] = useState("");
  const [masterObjetosCompletos, setMasterObjetosCompletos] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  let objetosRefresh = [];

  const [formulario, setFormulario] = useState();
  const auth = getAuth();

  useEffect(() => {
    if(formulario !== undefined){
      objects.map(function (doc) {
        const metros = getDistance(
          { latitude: formulario.ubicacion.latitude, longitude: formulario.ubicacion.longitude },
          { latitude: doc.data().ubicacion.latitude, longitude: doc.data().ubicacion.longitude }
        );
        const dato = doc.data();
        dato.distancia = Math.round((metros/1000) * 10) / 10;
        console.log(dato)
        objetos.push(dato);
      });
      setObjetosCompletos(objetos);
      setMasterObjetosCompletos(objetos);
    }
    else{
      const r = query(
        collection(db, "cuestionarioBeneficiario"),
        where("id", "==", auth.currentUser.uid)
      );
  
      onSnapshot(r, async (snapshot) => {
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "cuestionarioBeneficiario", data.id);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.id = data.id;
          setFormulario(newData);
        }
      });
    }

  }, [formulario]);

  const goToObject = (objeto) => {
    navigation.navigate(screen.objects.objeto, { id: objeto.id, tipo: objeto.tipo });
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterObjetosCompletos.filter(function (item) {
        const itemData = item.titulo.toLowerCase()
          ? item.titulo.toLowerCase()
          : "";
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setObjetosCompletos(newData);
      setSearch(text);
    } else {
      setObjetosCompletos(masterObjetosCompletos);
      setSearch(text);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const q = query(
      collection(db, "objetos"),
      where("activa", "==", true),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "objetos", data.id);
        const docSnap = await getDoc(docRef);

        const dato = docSnap.data();

        objetosRefresh.push(dato);
      }
    });
    setObjetosCompletos(objetosRefresh);
    setMasterObjetosCompletos(objetosRefresh);
    wait(3500).then(() => {
      setRefreshing(false);
      setSearch("");
    });
  }, [objetosRefresh]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buscar}>
        <Icon
          type="material-community"
          name="magnify"
          color="#c2c2c2"
          size={30}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Buscar objeto"
        />
        {search != "" && (
          <Icon
            type="material-community"
            name="close"
            color="black"
            size={20}
            containerStyle={styles.deleteContainer}
            style={styles.deleteIcon}
            onPress={() => {
              setObjetosCompletos(masterObjetosCompletos);
              setSearch("");
            }}
          />
        )}
      </View>
      {refreshing ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={objetosCompletos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(doc) => {
              const objeto = doc.item;
              return (
                <TouchableOpacity onPress={() => goToObject(objeto)}>
                  <View style={styles.objeto}>
                    <Image
                      source={{ uri: objeto.fotos[0] }}
                      style={styles.image}
                    />

                    <View style={styles.informacion}>
                      <Text style={styles.name}>{objeto.titulo}</Text>
                      <Text style={styles.info}>{objeto.tipo}</Text>
                      <Text style={styles.info}>{objeto.descripcion}</Text>
                      <Text style={styles.info}>{objeto.distancia} Km</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            extraData={objetosCompletos}
          />
        </>
      )}
    </View>
  );
}
