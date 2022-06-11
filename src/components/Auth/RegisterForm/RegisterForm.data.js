import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es correcto")
      .required("El email es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "Como minimo ingresar 8 digitos")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Debe contener un caracter en mayúscula, uno en minúscula, un número y un carácter de caso especial"
      ),
    repeatPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
  });
}
