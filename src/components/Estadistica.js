import React, { useState, useEffect } from "react";
import { db, screen } from "../utils";
import { View, Alert, ScrollView } from "react-native";
import { Image, Text, Icon, Button, Input } from "react-native-elements";
import { Loading, NoEstadistica } from "../components/Shared";
import { useNavigation } from "@react-navigation/native";
import { size, forEach, map } from "lodash";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { array } from "yup";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./Estadistica.styles";

export function Estadistica(props) {
    const ranking = [];
    let arrayFinal = [];
    const [arrayPie, setArrayPie] = useState(null);
    const [arrayRanking, setArrayRanking] = useState(null);
    const [arrayNombres, setArrayNombres] = useState(null);
    const [arrayCantidad, setCantidadRanking] = useState(null);
    const delivered = props.delivered;
    const datosPersonales = props.datosPersonales;
    const arrayfiltrado = [];
    const rankingFinal = [];
    //if (props===null)
    // return <NotFound texto={"No hay estadisticas"} />;

    const [year, setYear] = useState("");
    let data = [];
    let cantidadFinal = [];
    let nombresFinal = [];


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

    const navigation = useNavigation();
    // const filterByYear = (year) => {
    //     datosPersonales.forEach((element) => {
    //         if (element.year !== year) {
    //         } else {
    //             arrayfiltrado.push(element);
    //         }
    //        
    //     });
    // };

    useEffect(() => {
        forEach(datosPersonales, (item) => {
            if (item.cuestionarioBeneficiario.alimentos === true) {
                countAlimentos = countAlimentos + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.ropa === true) {
                countRopa = countRopa + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.juguetes === true) {
                countJuguetes = countJuguetes + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.libros === true) {
                countLibros = countLibros + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.materiales === true) {
                countMateriales = countMateriales + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.muebles === true) {
                countMuebles = countMuebles + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.objetos === true) {
                countObjetos = countObjetos + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.otros === true) {
                countOtros = countOtros + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.salud === true) {
                countSalud = countSalud + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.servicio === true) {
                countServicio = countServicio + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.herramientas === true) {
                countHerramientas = countHerramientas + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.electrodomesticos === true) {
                countElectrodomesticos = countElectrodomesticos + 1;
                count = count + 1;
            }
            if (item.cuestionarioBeneficiario.utiles === true) {
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

        const array = [
            {
                name: "% Ropa",
                population: Math.trunc(porcentajeRopa),
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Utiles",
                population: Math.trunc(porcentajeUtiles),
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Electrodomesticos",
                population: Math.trunc(porcentajeElectrodomesticos),
                color: "#ffffff",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Objetos",
                population: Math.trunc(porcentajeObjetos),
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Herramientas",
                population: Math.trunc(porcentajeHerramientas),
                color: "#05f2f2",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Servicio",
                population: Math.trunc(porcentajeServicio),
                color: "#e87568",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Salud",
                population: Math.trunc(porcentajeSalud),
                color: "#437571",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Otros",
                population: Math.trunc(porcentajeOtros),
                color: "#444375",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Muebles",
                population: Math.trunc(porcentajeMuebles),
                color: "#6f4375",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Alimentos",
                population: Math.trunc(porcentajeAlimento),
                color: "rgb(224, 66, 245)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Juguetes",
                population: Math.trunc(porcentajeJuguetes),
                color: "#dbf205",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Libros",
                population: Math.trunc(porcentajeLibros),
                color: "#05f230",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "% Materiales",
                population: Math.trunc(porcentajeMateriales),
                color: "#4a122e",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
        ];


        array.forEach((item) => {

            if (isNaN(item.population) !== true) {
                if (item.population > 0) {
                    arrayFinal.push(item);
                }
            } else {

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

        setArrayPie(arrayFinal);

    }, []);




    useEffect(() => {
        forEach(delivered, (item) => {

            if (ranking[0] === undefined) {
                const rankingCount = {
                    idUserDonator: item.idUserDonator,
                    cantidad: 1,
                    nombre: item.nombre,
                };
                ranking.push(rankingCount);
            } else {
                for (var i = 0; i < ranking.length; i++) {
                    if (ranking[i].idUserDonator === item.idUserDonator) {
                        ranking[i].cantidad = ranking[i].cantidad + 1;
                        ranking[i].nombre = item.nombre;
                    } else {
                        const rankingCount = {
                            idUserDonator: item.idUserDonator,
                            cantidad: 1,
                            nombre: item.nombre,
                        };
                        ranking.push(rankingCount);
                    }
                }
            }
        });

        ranking.sort(function (a, b) {
            if (a.cantidad < b.cantidad) {
                return 1;
            }
            if (a.cantidad > b.cantidad) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        for (var i = 0; i < ranking.length; i++) {

            const elemento = ranking[i].idUserDonator;
            const cantidad = ranking[i].cantidad;
            const nombre = ranking[i].nombre;

            if (!rankingFinal.includes(ranking[i].idUserDonator)) {
                rankingFinal.push(elemento);
                cantidadFinal.push(cantidad);
                //console.log(nombre);
                nombresFinal.push(nombre);

            }
        }
        setArrayNombres(nombresFinal);
        setArrayRanking(rankingFinal);
        setCantidadRanking(cantidadFinal);
    }, []);

    //console.log(arrayNombres);







    if (size(arrayRanking)) {
        data = {
            labels: [arrayNombres[0], arrayNombres[1], arrayNombres[2], arrayNombres[3], ""],
            datasets: [
                {
                    data: [arrayCantidad[0], arrayCantidad[1], arrayCantidad[2], arrayCantidad[3], 0],
                },
            ],
        };
    } else {
        data = {
            labels: ["A"],
            datasets: [
                {
                    data: [1],
                },
            ],
        };
    }



    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0,
        color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 0, // optional,
    };

    // return (
    //     <ScrollView>
    //         {map(arrayPie, (objeto) => (
    //             <View>
    //                 <Text>{objeto.population}{objeto.name}</Text>
    //             </View>
    //         ))}
    //         {map(arrayRanking, (objeto) => (
    //             <View>
    //                 <Text>{objeto.cantidad}</Text>
    //             </View>
    //         ))}

    //     </ScrollView>
    // );

    const ChangeYear = (year) => {
        setYear(year);
    }

    const goToRequest = (year) => {

        navigation.navigate(screen.account.redirectEstadistica, { year: year });

    }


    if (!arrayFinal) return <Loading show text="Cargando" />;

    //  if (size(arrayFinal) === 0) return <NotFound texto={"No hay estadisticas"} />;

    return (
        <ScrollView style={styles.screen}>





            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 50,
                    marginBottom: 50,
                }}
            >
                Objetos mas solicitados por usuarios:
            </Text>

            {size(arrayPie) != 0 ? (
                <PieChart
                    data={arrayPie}
                    width={Dimensions.get("window").width - 16}
                    height={240}
                    chartConfig={{
                        backgroundColor: "#1cc910",
                        backgroundGradientFrom: "#eff3ff",
                        backgroundGradientTo: "#efefef",
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
            ) : (
                // <NotFound texto={"No hay estadisticas"} />
                <NoEstadistica texto={"No hay estadistica"} />
            )}

            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 50,
                    marginBottom: 50,
                }}
            >
                Usuarios con mas donaciones:
            </Text>

            {size(arrayRanking) != 0 ? (
                <BarChart
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    data={data}
                    width={Dimensions.get("window").width - 16}
                    height={300}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            ) : (
                //<Loading show text="Cargando" />
                <NoEstadistica texto={"No hay estadistica"} />
            )}

            <View style={{
                justifyContent: 'center', //Centered vertically
                alignItems: 'center', // Centered horizontally
                flex: 1
            }}>
                <Picker
                    selectedValue={year}
                    style={{ width: 150, }}
                    onValueChange={(value) => (
                        ChangeYear(value))

                    }>
                    <Picker.Item label="2022" value="2022" />
                    <Picker.Item label="2021" value="2021" />
                    <Picker.Item label="2020" value="2020" />
                    <Picker.Item label="2019" value="2019" />

                </Picker>
                <Button title={"Filtrar"} onPress={() => { goToRequest(year) }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 140,
                        marginVertical: 10,
                    }}
                    buttonStyle={{
                        borderRadius: 10,
                        borderTopWidth: 1,
                        borderTopColor: "#62bd60",
                        borderBottomWidth: 1,
                        borderBottomColor: "#62bd60",
                        backgroundColor: "#62bd60",
                    }}
                />
            </View>


        </ScrollView>
    );
}
