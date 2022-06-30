import * as Yup from "yup";

export function initialValues(dato) {
  return {
    titulo: null,
    descripcion: null,
    ubicacion: null,
    tipo: null,
    fotos: [],
    activa: null,
    idUsuario: null,
    distancia: 0,
  };
}

export function validationSchem() {
  return Yup.object({
    titulo: Yup.string()
      .required("Campo obligatorio")
      .max(30, "Tiene más de 30 caracteres"),
    descripcion: Yup.string()
      .required("Campo obligatorio")
      .max(140, "Tiene más de 140 caracteres"),
    ubicacion: Yup.object().required("La localización es obligatoria"),
    fotos: Yup.array()
      .min(1, "Se requiere una foto como minimo")
      .required("La foto es requerida"),
  });
}
