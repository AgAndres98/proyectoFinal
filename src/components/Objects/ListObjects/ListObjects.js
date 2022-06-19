import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
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

  useEffect(() => {
    objects.map(function (doc) {
      objetos.push(doc.data());
    });
    setObjetosCompletos(objetos);
    setMasterObjetosCompletos(objetos);
  }, []);

  const goToObject = (objeto) => {
    navigation.navigate(screen.objects.objeto, { id: objeto.id });
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
    wait(3500).then(() => setRefreshing(false));
  }, [objetosRefresh]);

  return (
    <View style={{ flex: 1 }}>
      {refreshing ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ height: "12%" }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
          </ScrollView>
          <FlatList
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
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            extraData={objetosCompletos}
          />
        </View>
      )}
    </View>
  );
}
