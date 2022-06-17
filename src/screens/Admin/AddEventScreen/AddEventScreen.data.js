import * as Yup from "yup";

export function initialValues() {
  return {
    titulo: "",
    organizador: "",
    descripcion: "",
    telefono: "",
    email: "",
    direccion: "",
    ubicacion: null,
    fecha: "",
    fotos: [],
    idUsuario: "",
  };
}

export function validationSchem() {
  return Yup.object({
    titulo: Yup.string()
      .required("Campo obligatorio")
      .max(30, "Tiene más de 30 caracteres"),
    organizador: Yup.string()
      .required("Campo obligatorio")
      .max(30, "Tiene más de 30 caracteres"),
    descripcion: Yup.string()
      .required("Campo obligatorio")
      .max(140, "Tiene más de 140 caracteres"),
    telefono: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es obligatorio"),
    direccion: Yup.string()
      .required("Campo obligatorio")
      .max(140, "Tiene más de 140 caracteres"),
    ubicacion: Yup.object().required("La localización es obligatoria"),
    fecha: Yup.string().required("La fecha es obligatoria"),
    fotos: Yup.array()
      .min(1, "Se requiere una foto como minimo")
      .required("La foto es requerida"),
  });
}
