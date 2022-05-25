import * as Yup from "yup";

export function initialValues() {
    return {
        incendios: "",
        inundaciones: "",
        tsunamis: "",
        gente: "",
        grupoFamiliar: "nada",
        mayoresDeEdad: "nada",
        cercania: "nada",
        sexo: "nada",
    };
}

export function validationSchem() {
    return Yup.object({
        incendios: Yup.string().required("Campo obligatorio").matches(/^[1-5]+$/, "Del 1 al 5")
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
        inundaciones: Yup.string().required("Campo obligatorio").matches(/^[1-5]+$/, "Del 1 al 5")
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
        tsunamis: Yup.string().required("Campo obligatorio").matches(/^[1-5]+$/, "Del 1 al 5")
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
        gente: Yup.string().required("Campo obligatorio").matches(/^[1-5]+$/, "Del 1 al 5")
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
    });
}