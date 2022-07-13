import React, { useState, useEffect, Form } from "react";
import { db, screen } from "../utils";
import { View, Alert, ScrollView } from "react-native";
import { Image, Text, Icon, Button, Input, TextInput } from "react-native-elements";
import { Loading } from "./Shared";
import { size, forEach, map } from "lodash";
import { BarChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { array, number } from "yup";
import { EstadisticaScreen } from "../screens/EstadisticaScreen";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { color } from "react-native-elements/dist/helpers";
import { RedirectScreen } from "../screens/Account/RedirectScreen/RedirectScreen";
import { NoEstadistica } from "./Shared/NoEstadistica/NoEstadistica";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { styles } from "./Estadistica.styles";
export function EstadisticaBeneficiarioFiltrado(props) {
    let arrayFinal = [];
    const [arrayPie, setArrayPie] = useState(null);
    const objetos = props.objetos;
    const myYear = props.year;
    //console.log(objetos);
    const porcentajeFinal = props.porcentajeFinal;
    const [year, setYear] = useState("");
    let data = [];

    //  if((myYear)!==""){
    //      setYear(myYear);

    //  }else{
    //     setYear(new Date().getFullYear())

    // }


    const formik = useFormik({
        initialValues: {
            myYear: ""
        },
        onsubmit: values => {

        }
    }
    );


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
        forEach(objetos, (item) => {
            if (item.tipo === "Alimento") {
                countAlimentos = countAlimentos + 1;
                count = count + 1;
            }
            if (item.tipo === "Ropa") {
                countRopa = countRopa + 1;
                count = count + 1;
            }
            if (item.tipo === "Juguetes") {
                countJuguetes = countJuguetes + 1;
                count = count + 1;
            }
            if (item.tipo === "Libros") {
                countLibros = countLibros + 1;
                count = count + 1;
            }
            if (item.tipo === "Materiales") {
                countMateriales = countMateriales + 1;
                count = count + 1;
            }
            if (item.tipo === "Muebles") {
                countMuebles = countMuebles + 1;
                count = count + 1;
            }
            if (item.tipo === "Objetos") {
                countObjetos = countObjetos + 1;
                count = count + 1;
            }
            if (item.tipo === "Otros") {
                countOtros = countOtros + 1;
                count = count + 1;
            }
            if (item.tipo === "Salud") {
                countSalud = countSalud + 1;
                count = count + 1;
            }
            if (item.tipo === "Servicio") {
                countServicio = countServicio + 1;
                count = count + 1;
            }
            if (item.tipo === "Herramientas") {
                countHerramientas = countHerramientas + 1;
                count = count + 1;
            }
            if (item.tipo === "Electrodomesticos") {
                countElectrodomesticos = countElectrodomesticos + 1;
                count = count + 1;
            }
            if (item.tipo === "Utiles escolares") {
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
    console.log(porcentajeFinal);
    if (porcentajeFinal == Infinity) return <Loading show text="Cargando" />;
    data = {
        labels: ["Entregas", "Solicitudes"], // optional
        data: [porcentajeFinal, 1]
    }




    const ChangeYear = (year) => {
        setYear(year);
    }

    const goToRequest = (year) => {
        navigation.navigate(screen.account.EstadisticaBeneficiario, { year: year });
    }

    //if (!arrayFinal) return <NotFound texto={"No hay estadisticas"} />;
    // if (size(arrayFinal) === 0) return <NotFound texto={"No hay estadisticas"} />;

    var stylePicker = StyleSheet.create({
        content: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },

    });



    return (

        <View >
            <ScrollView style={styles.screen}>
                {/*          
             <Input value={formik.values.myYear} placeholder='Ingrese el año de la estadistica ej :2000' 
            onChangeText={(text)=>formik.setFieldValue("myYear",text)} keyboardType="number-pad"/>
            <Button onPress={formik.handleSubmit} title="Ver estadisticas por año" />  */}

                {/* <Text>{year}</Text>  */}


                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 50,
                        marginBottom: 50,
                    }}
                >
                    Tipos de objetos mas publicados:
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
                    <Loading show text="Cargando" />

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
                    Porcentaje de entregas:
                </Text>

                {data.data[0] != 0 ? (

                    <ProgressChart
                        data={data}
                        width={Dimensions.get("window").width - 16}
                        height={300}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                        style={{
                            paddingRight: 110,
                        }}
                    />) : (
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



            </ScrollView></View>
    );

}
