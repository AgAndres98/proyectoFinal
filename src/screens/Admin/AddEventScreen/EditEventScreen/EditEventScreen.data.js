import * as Yup from "yup";

export function initialValues(dato) {
    return {
        titulo: "",
        organizador: "",
        descripcion: "",
        telefono: "",
        email: "",
        direccion: "",
        ubicacion: "",
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
    });
}
