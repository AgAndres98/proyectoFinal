import React, {useState} from "react";

import { View, Text, Button } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./InformationPersonalForm.styles"
import DateTimePicker from '@react-native-community/datetimepicker';


export function InformationPersonalForm(props) {
    const { formik } = props;

    const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    formik.setFieldValue("fechaNacimiento", value.toLocaleDateString('en-GB'))
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <View style={styles.contentAdentro} >
            <Input style={styles.input} placeholder="Nombre" onChangeText={(text) => formik.setFieldValue("nombre", text)} errorMessage={formik.errors.nombre}/>
            <Input placeholder="Apellido" onChangeText={(text) => formik.setFieldValue("apellido", text)} errorMessage={formik.errors.apellido}/>
            <Input placeholder="DNI" keyboardType="number-pad" onChangeText={(text) => formik.setFieldValue("dni", text)} errorMessage={formik.errors.dni}/>
            <Input placeholder="Fecha de nacimiento" value={date.toLocaleDateString('en-GB')} disabled={true} 
            rightIcon={{
                type: "material-community",
                name: "calendar",
                color: "#62bd60",
                onPress: showPicker,
            }} errorMessage={formik.errors.fechaNacimiento}/>
            <Input placeholder="Número de celular" keyboardType="number-pad" onChangeText={(text) => formik.setFieldValue("celular", text)} errorMessage={formik.errors.celular}/>
            
            {/* The date picker */}
            {isPickerShow && (
                <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
                style={styles.datePicker}
                />
            )}
        </View>
    );
}
