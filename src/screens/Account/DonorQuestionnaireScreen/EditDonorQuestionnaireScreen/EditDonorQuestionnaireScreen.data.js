import * as Yup from "yup";

export function initialValues() {
    return {
        incendios: null,
        inundaciones: null,
        tsunamis: null,
        gente: null,
        grupoFamiliar: null,
        mayoresDeEdad: null,
        cercania: null,
        idUsuario: null,
    };
}

export function validationSchem() {
    return Yup.object({
        incendios: Yup.string()
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
        inundaciones: Yup.string()
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
        tsunamis: Yup.string()
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
        gente: Yup.string()
        .min(1, 'Del 1 al 5')
        .max(1, 'Del 1 al 5'),
    });
}