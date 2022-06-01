import * as Yup from "yup";

export function initialValues() {


    return {
        titulo: "",
        descripcion: "",
        ubicacion: null,
        tipo: "Ropa",
        fotos: [],
        activa: true,
        idUsuario: "",
    };
}

export function validationSchem() {
    return Yup.object({
        titulo: Yup.string().required("Campo obligatorio"),
        descripcion: Yup.string().required("Campo obligatorio"),
        ubicacion: Yup.object().required("La localización es obligatoria"),
        fotos: Yup.array().min(1, "Se requiere una foto como minimo").required("La foto es requerida"),
    });
}