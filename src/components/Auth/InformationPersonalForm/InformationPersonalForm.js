import React from "react";

import { View, Text } from "react-native";
import { Input , Icon, Button } from "react-native-elements";
import { styles } from "./InformationPersonalForm.styles"

export function InformationPersonalForm(props) {
    const { formik } = props;

    return (
        <>
            <Input style={styles.input} placeholder="Nombre" onChangeText={(text) => formik.setFieldValue("nombre", text)} errorMessage={formik.errors.nombre}/>
            <Input placeholder="Apellido" onChangeText={(text) => formik.setFieldValue("apellido", text)} errorMessage={formik.errors.apellido}/>
            <Input placeholder="DNI" onChangeText={(text) => formik.setFieldValue("dni", text)} errorMessage={formik.errors.dni}/>
            <Input placeholder="Fecha de nacimiento" onChangeText={(text) => formik.setFieldValue("fechaNacimiento", text)} errorMessage={formik.errors.fechaNacimiento}/>
            <Input placeholder="Número de celular" onChangeText={(text) => formik.setFieldValue("celular", text)} errorMessage={formik.errors.celular}/>
        </>
    );
}

