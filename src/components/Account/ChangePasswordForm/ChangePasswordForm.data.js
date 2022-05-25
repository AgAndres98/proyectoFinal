import * as Yup from "yup";

export function initialValues(){
    return{
        password:"",
        newPassword:"",
        confirmNewPassword:"",
    };
}

export function validationSchema(){
    return Yup.object({
        password:Yup.string().required("Este campo es obligatorio"),
        newPassword:Yup.string().required("Este campo es obligatorio"),
        confirmNewPassword:Yup.string().required("Este campo es obligatorio")
        .oneOf([
            Yup.ref("newPassord")],
            "Las nuevas contraeñas tienen que ser iguales"
            ),
    });
}