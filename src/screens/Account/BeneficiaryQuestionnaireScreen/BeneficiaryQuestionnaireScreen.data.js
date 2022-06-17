import * as Yup from "yup";

export function initialValues() {


    return {
        motivo: "",
        descripcion: "",
        ubicacion: null,
        herramientas: false,
        juguetes: false,
        libros: false,
        materiales: false,
        muebles: false,
        salud: false,
        servicio: false,
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