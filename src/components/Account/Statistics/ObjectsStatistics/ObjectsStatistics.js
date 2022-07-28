import React, { useState, useEffect, Form } from "react";
import { View, Alert, ScrollView } from "react-native";
import {
  Image,
  Text,
  Icon,
  Button,
  Input,
  TextInput,
} from "react-native-elements";
import { size, forEach, map } from "lodash";
import { BarChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import { styles } from "./ObjectsStatistics.styles";
import { db, screen } from "../../../../utils";
import { Loading, NoEstadistica } from "../../../Shared";

export function ObjectsStatistics(props) {
  let arrayFinal = [];
  const [arrayPie, setArrayPie] = useState(null);
  const { objetos, delivered, requests } = props;
  let data = [];

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
        name: "Ropa",
        population: porcentajeRopa,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Utiles",
        population: porcentajeUtiles,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Electrodomésticos",
        population: porcentajeElectrodomesticos,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Objetos",
        population: porcentajeObjetos,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Herramientas",
        population: porcentajeHerramientas,
        color: "#05f2f2",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Servicio",
        population: porcentajeServicio,
        color: "#e87568",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Salud",
        population: porcentajeSalud,
        color: "#437571",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Otros",
        population: porcentajeOtros,
        color: "#444375",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Muebles",
        population: porcentajeMuebles,
        color: "#6f4375",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Alimentos",
        population: porcentajeAlimento,
        color: "rgb(224, 66, 245)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Juguetes",
        population: porcentajeJuguetes,
        color: "#dbf205",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Libros",
        population: porcentajeLibros,
        color: "#05f230",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Materiales",
        population: porcentajeMateriales,
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
      }
    });

    arrayFinal.sort((a, b) => {
      return b.population - a.population;
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

  data = {
    labels: ["", "Entregas", "Solicitudes"],
    datasets: [
      {
        data: [0, delivered, requests],
      },
    ],
  };

  //if (!arrayFinal) return <NotFound texto={"No hay estadisticas"} />;
  // if (size(arrayFinal) === 0) return <NotFound texto={"No hay estadisticas"} />;

  return (
    <View>
      <ScrollView style={styles.screen}>
        <Text style={styles.statisticsType}>
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
              marginLeft: 45,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            //absolute //for the absolute number remove if you want percentage
          />
        ) : (
          <Loading show text="Cargando" />
        )}

        <Text style={styles.statisticsType}>Entregas y solicitudes:</Text>

        {size(arrayPie) != 0 ? (
          <BarChart
            style={{
              marginVertical: 8,
              borderRadius: 16,
              paddingRight: 45,
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
      </ScrollView>
    </View>
  );
}
