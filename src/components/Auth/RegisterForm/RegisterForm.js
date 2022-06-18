import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { screen } from "../../../utils";
import { styles } from "./RegisterForm.styles";

export function RegisterForm() {
  const [showPassword, setPassword] = useState(false);
  const [showPassword2, setPassword2] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValues.email,
          formValues.password
        );
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se registró con exito",
        });
        navigation.navigate(screen.account.tab);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1:
            "Error al registrarse, el correo electronico ya esta registrado",
        });
      }
    },
  });

  const showHidenPassword = () => setPassword((prevState) => !prevState);
  const showHidenPassword2 = () => setPassword2((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword2 ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword2 ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidenPassword2}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
