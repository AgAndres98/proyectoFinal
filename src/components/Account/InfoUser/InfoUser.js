import React, { useState, useEffect } from 'react'
import { DatePickerIOSBase, View } from 'react-native';
import { Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./InfoUser.styles";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  Firestore,
} from "firebase/firestore";
import { db } from "../../../utils";




export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const auth = getAuth();
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [datos, setDatos] = useState(null);

  const [avatar, setAvatar] = useState(photoURL);

  useEffect(() => {
    const q = query(
      collection(db, "datosPersonales"),
      where("idUsuario", "==", auth.currentUser.uid)
    );

    onSnapshot(q, async (snapshots) => {

      for await (const item of snapshots.docs) {
        const data = item.data();
        const docRef = doc(db, "datosPersonales", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;
        setDatos(newData);
      };
    });
  }, []);


  console.log("DATOS INFOUSER");
  console.log(datos);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) uploadImage(result.uri);
  };

  const uploadImage = async (uri) => {
    // setLoadingText("Actualizando Avatar");
    //setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);

    });
  };

  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });

    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={avatarUri(avatar)}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{datos.nombre} {datos.apellido}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

function avatarUri(avatar) {
  if (avatar !== null) {
    return uri = { uri: avatar };
  }
}