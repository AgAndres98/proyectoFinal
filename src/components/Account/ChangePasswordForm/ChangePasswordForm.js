import React,{useState} from 'react'
import { View} from 'react-native';
import {Input,Button} from "react-native-elements";
import { useFormik } from 'formik';
import { initialValues,validationSchema } from './ChangePasswordForm.data';
import {styles} from "./ChangePasswordForm.styles";
import { async } from '@firebase/util';


export  function ChangePasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const onShowPassword=()=>setShowPassword((prevState)=>!prevState);
 
    const formik=useFormik({
        initialValues:initialValues(),
        validationSchema:validationSchema(),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
            console.log(formValue);
        },
    });
    


  return (
    <View style={styles.content}>
      <Input placeholder='Contraseña actual' 
      containerStyle={styles.input} 
      secureTextEntry={showPassword ? false: true}
      rightIcon={{
          type:"material-community",
          name:showPassword ? "eye-off-outline":"eye-outline",
          color:"#c2c2c2",
          onPress:onShowPassword,
      }}
      onChangeText={(text)=>formik.setFieldValue("password",text)}
      errorMessage={formik.errors.password}
      />
      <Input placeholder='Nueva contraseña' 
      containerStyle={styles.input} 
      secureTextEntry={showPassword ? false: true}
      rightIcon={{
          type:"material-community",
          name:showPassword ? "eye-off-outline":"eye-outline",
          color:"#c2c2c2",
          onPress:onShowPassword,
      }}
      onChangeText={(text)=>formik.setFieldValue("newPassword",text)}
      errorMessage={formik.errors.newPassword}
      />
       <Input placeholder='Repite nueva contraseña' 
      containerStyle={styles.input} 
      secureTextEntry={showPassword ? false: true}
      rightIcon={{
          type:"material-community",
          name:showPassword ? "eye-off-outline":"eye-outline",
          color:"#c2c2c2",
          onPress:onShowPassword,
      }}
      onChangeText={(text)=>formik.setFieldValue("confirmNewPassword",text)}
      errorMessage={formik.errors.confirmNewPassword}
      />
      <Button title="Cambiar contraeña" containerStyle={styles.btnContainer} buttonStyle={styles.btn}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />
    </View>
  )
}