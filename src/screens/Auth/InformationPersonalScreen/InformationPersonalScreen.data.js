import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    celular: "",
    idUsuario: "",
    email: "",
    cuestionarioBeneficiario: [],
  };
}

export function validationSchem() {
  return Yup.object({
    nombre: Yup.string()
      .required("Campo obligatorio")
      .max(30, "Tiene más de 30 caracteres"),
    apellido: Yup.string()
      .required("Campo obligatorio")
      .max(30, "Tiene más de 30 caracteres"),
    dni: Yup.string()
      .required("Campo obligatorio")
      .min(8, "El DNI tiene que tener 8 dígitos.")
      .max(8, "El DNI tiene que tener 8 dígitos."),
    fechaNacimiento: Yup.string().required("Campo obligatorio"),
    celular: Yup.string().required("Campo obligatorio"),
  });
}
