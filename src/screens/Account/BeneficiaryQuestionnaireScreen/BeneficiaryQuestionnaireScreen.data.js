import * as Yup from "yup";

export function initialValues() {


    return {
        motivo: "",
        descripcion: "",
        ubicacion: null,
        ropa: false,
        objetos: false,
        alimentos: false,
        electrodomesticos: false,
        utiles: false,
        otros: false,
        fotos: [],
        ayuda: "",
        idUsuario: "",
    };
}

export function validationSchem() {
    return Yup.object({

    });
}