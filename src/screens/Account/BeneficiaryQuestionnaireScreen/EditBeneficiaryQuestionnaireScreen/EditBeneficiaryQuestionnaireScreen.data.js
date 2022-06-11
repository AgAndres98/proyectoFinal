import * as Yup from "yup";

export function initialValues() {


    return {
        motivo: null,
        descripcion: null,
        ubicacion: null,
        ropa: null,
        objetos: null,
        alimentos: null,
        electrodomesticos: null,
        utiles: null,
        otros: null,
        fotos: [],
        ayuda: null,
        idUsuario: null,
    };
}

export function validationSchem() {
    return Yup.object({

    });
}