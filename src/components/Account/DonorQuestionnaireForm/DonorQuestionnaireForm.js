import React, {useState} from "react";

import { View, Text, Button } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./DonorQuestionnaireForm.styles"
import { Picker } from "@react-native-picker/picker"



export function DonorQuestionnaireForm(props) {
    const { formik } = props;

    return (
        <View style={styles.contentAdentro} >
            <Text style={styles.titulo} >¿Con que caso te identificas mas?</Text>
            <View style={{flex: 1, flexDirection: "row"}} >
                <Text style={styles.text} >
                    Incendios
                </Text>
                <Input placeholder="Puntuación" inputContainerStyle={styles.inputIncendios} errorStyle={{marginLeft: 190}} inputStyle={{fontSize: 12}} keyboardType="number-pad" onChangeText={(text) => formik.setFieldValue("incendios", text)} errorMessage={formik.errors.incendios}/>
            </View>
            <View style={{flex: 1, flexDirection: "row"}} >
                <Text style={styles.text} >
                    Inundaciones
                </Text>
                <Input placeholder="Puntuación" inputContainerStyle={styles.inputInundaciones} errorStyle={{marginLeft: 165}} inputStyle={{fontSize: 12}} keyboardType="number-pad" onChangeText={(text) => formik.setFieldValue("inundaciones", text)} errorMessage={formik.errors.inundaciones}/>
            </View>
            <View style={{flex: 1, flexDirection: "row"}} >
                <Text style={styles.text} >
                    Tsunamis
                </Text>
                <Input placeholder="Puntuación" inputContainerStyle={styles.inputTsunamis} errorStyle={{marginLeft: 190}} inputStyle={{fontSize: 12}} keyboardType="number-pad" onChangeText={(text) => formik.setFieldValue("tsunamis", text)} errorMessage={formik.errors.tsunamis}/>
            </View>
            <View style={{flex: 1, flexDirection: "row"}} >
                <Text style={styles.text} >
                    Gente en situación de calle
                </Text>
                <Input placeholder="Puntuación" inputContainerStyle={styles.inputCalle} errorStyle={{marginLeft: 72}} inputStyle={{fontSize: 12}} keyboardType="number-pad" onChangeText={(text) => formik.setFieldValue("gente", text)} errorMessage={formik.errors.gente}/>
            </View>
            <Text style={styles.titulo} >Seleccione la opción que mas lo identifique</Text>
            <Text style={styles.textoSelect} >¿A quienes queres ayudar?</Text>
            <Picker
                selectedValue={formik.values.grupoFamiliar}
                style={styles.selectDeObjeto}
                onValueChange={(itemValue, itemIndex) =>
                    formik.setFieldValue("grupoFamiliar", itemValue)
                }>
                <Picker.Item label="Me es indiferente" value="nada" />
                <Picker.Item label="A una familia" value="familia" />
                <Picker.Item label="A una persona" value="una" />
            </Picker>
            <Text style={styles.textoSelect} >¿A que edad prefieres ayudar?</Text>
            <Picker
                selectedValue={formik.values.mayoresDeEdad}
                style={styles.selectDeObjeto}
                errorMessage={formik.errors.mayoresDeEdad}
                onValueChange={(itemValue, itemIndex) =>
                    formik.setFieldValue("mayoresDeEdad", itemValue)
                }>
                <Picker.Item label="Me es indiferente" value="nada" />
                <Picker.Item label="Mayores de 18 años" value="mayores" />
                <Picker.Item label="Menores de 18 años" value="menores" />
            </Picker>
            <Text style={styles.textoSelect} >¿Que cercanía te gustaría tener?</Text>
            <Picker
                selectedValue={formik.values.cercania}
                style={styles.selectDeObjeto}
                onValueChange={(itemValue, itemIndex) =>
                    formik.setFieldValue("cercania", itemValue)
                }>
                <Picker.Item label="Me es indiferente" value="nada" />
                <Picker.Item label="Menos de 2 km" value="-2" />
                <Picker.Item label="Entre 2 km y 5 km" value="2y5" />
                <Picker.Item label="Mas de 5 km" value="+5" />
            </Picker>
        </View>
    );
}