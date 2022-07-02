import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ScrollView,
    Modal
} from "react-native";
import { db, screen } from "../utils";
import { NotFound, Loading } from "../components/Shared";
import {
    collection,
    query,
    onSnapshot,
} from "firebase/firestore";
import { size, forEach } from "lodash";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import { Button } from "react-native-elements";




export function Estadistica() {

    const [showModal, setShowModal] = useState(false);
    const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
    const [datosPersonales, setDatosPersonales] = useState(null);
    let countRopa = 0;
    let countJuguetes = 0;
    let countLibros = 0;
    let countMateriales = 0;
    let countMuebles = 0;
    let countObjetos = 0;
    let countAlimentos = 0;
    let countOtros = 0;
    let countSalud = 0;
    let countServicio = 0;
    let countHerramientas = 0;
    let countElectrodomesticos = 0;
    let countUtiles = 0;
    let count = 0;


    useEffect(() => {
        const q = query(
            collection(db, "datosPersonales"),
        );

        onSnapshot(q, (snapshot) => {
            setDatosPersonales(snapshot.docs);
        });
    }, []);

    forEach(datosPersonales, async (item) => {


        if (item.data().cuestionarioBeneficiario.alimentos === true) {
            countAlimentos = countAlimentos + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.ropa === true) {
            countRopa = countRopa + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.juguetes === true) {
            countJuguetes = countJuguetes + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.libros === true) {
            countLibros = countLibros + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.materiales === true) {
            countMateriales = countMateriales + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.muebles === true) {
            countMuebles = countMuebles + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.objetos === true) {
            countObjetos = countObjetos + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.otros === true) {
            countOtros = countOtros + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.salud === true) {
            countSalud = countSalud + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.servicio === true) {
            countServicio = countServicio + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.herramientas === true) {
            countHerramientas = countHerramientas + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.electrodomesticos === true) {
            countElectrodomesticos = countElectrodomesticos + 1;
            count = count + 1;
        }
        if (item.data().cuestionarioBeneficiario.utiles === true) {
            countUtiles = countUtiles + 1;
            count = count + 1;
        }
    });



    const porcentajeAlimento = (countAlimentos * 100) / count;
    const porcentajeRopa = (countRopa * 100) / count;
    const porcentajeUtiles = (countUtiles * 100) / count;
    const porcentajeElectrodomesticos = (countElectrodomesticos * 100) / count;
    const porcentajeHerramientas = (countHerramientas * 100) / count;
    const porcentajeServicio = (countServicio * 100) / count;
    const porcentajeSalud = (countSalud * 100) / count;
    const porcentajeOtros = (countOtros * 100) / count;
    const porcentajeMuebles = (countMuebles * 100) / count;
    const porcentajeJuguetes = (countJuguetes * 100) / count;
    const porcentajeLibros = (countLibros * 100) / count;
    const porcentajeMateriales = (countMateriales * 100) / count;
    const porcentajeObjetos = (countObjetos * 100) / count;

    if (!datosPersonales) return <Loading show text="Cargando" />;
    if (size(datosPersonales) === 0) return <NotFound texto={"No hay estadisticas"} />;


    const array =
        [
            {
                name: '% Ropa',
                population: Math.trunc(porcentajeRopa),
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Utiles',
                population: Math.trunc(porcentajeUtiles),
                color: '#F00',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Electrodomesticos',
                population: Math.trunc(porcentajeElectrodomesticos),
                color: '#ffffff',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Objetos',
                population: Math.trunc(porcentajeObjetos),
                color: 'rgb(0, 0, 255)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Herramientas',
                population: Math.trunc(porcentajeHerramientas),
                color: '#05f2f2',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Servicio',
                population: Math.trunc(porcentajeServicio),
                color: '#e87568',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Salud',
                population: Math.trunc(porcentajeSalud),
                color: '#437571',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Otros',
                population: Math.trunc(porcentajeOtros),
                color: '#444375',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Muebles',
                population: Math.trunc(porcentajeMuebles),
                color: '#6f4375',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Alimentos',
                population: Math.trunc(porcentajeAlimento),
                color: 'rgb(224, 66, 245)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Juguetes',
                population: Math.trunc(porcentajeJuguetes),
                color: '#dbf205',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Libros',
                population: Math.trunc(porcentajeLibros),
                color: '#05f230',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: '% Materiales',
                population: Math.trunc(porcentajeMateriales),
                color: '#4a122e',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
        ];

    const arrayFinal = [];
    array.forEach(item => {
        if (item.population !== 0) {
            console.log(item);
            arrayFinal.push(item);
        }

    });

    arrayFinal.sort(function (a, b) {
        if (a.population < b.population) {
            return 1;
        }
        if (a.population > b.population) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    return (
        <View>
            <Text style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center"
            }}>Objetos mas solicitados por usuarios:</Text>





            <PieChart
                data={arrayFinal}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute //for the absolute number remove if you want percentage
            />



        </View >
    );
}


