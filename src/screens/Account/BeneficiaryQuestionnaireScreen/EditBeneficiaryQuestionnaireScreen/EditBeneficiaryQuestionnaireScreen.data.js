import * as Yup from "yup";

export function initialValues() {


    return {
        motivo: "incendio",
        descripcion: null,
        ubicacion: null,
        herramientas: null,
        juguetes: null,
        libros: null,
        materiales: null,
        muebles: null,
        salud: null,
        servicio: null,
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