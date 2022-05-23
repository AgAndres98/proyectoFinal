import * as Yup from "yup";

export function initialValues() {


    return {
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        celular: "",
    };
}

export function validationSchem() {
    return Yup.object({
        nombre: Yup.string().required("Campo obligatorio"),
        apellido: Yup.string().required("Campo obligatorio"),
        dni: Yup.string().required("Campo obligatorio").min(8, "El DNI tiene que tener 8 dígitos.").max(8, "El DNI tiene que tener 8 dígitos."),
        fechaNacimiento: Yup.string().required("Campo obligatorio"),
        celular: Yup.string().required("Campo obligatorio"),
    });
}