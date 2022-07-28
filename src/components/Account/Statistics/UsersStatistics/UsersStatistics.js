import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image, Button } from "react-native-elements";
import { size, forEach, map } from "lodash";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { array } from "yup";
import { Picker } from "@react-native-picker/picker";
import { Loading, NoEstadistica } from "../../../Shared";
import { styles } from "./UsersStatistics.styles";

export function UsersStatistics(props) {
  const { delivered, datosPersonales } = props;
  let ranking = [];
  let arrayFinal = [];
  const [arrayPie, setArrayPie] = useState(null);

  const [arrayRanking, setArrayRanking] = useState(null);
  const [arrayNombres, setArrayNombres] = useState(null);
  const [arrayCantidad, setCantidadRanking] = useState(null);
  const rankingFinal = [];

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
    delivered.map((item) => {
      if (ranking[0] === undefined) {
        const rankingCount = {
          idUserDonator: item.idUserDonator,
          cantidad: 1,
          nombre: item.nombre,
        };
        ranking.push(rankingCount);
      } else {
        var result = ranking.findIndex(
          (items) => items.idUserDonator === item.idUserDonator
        );
        if (result === -1) {
          const rankingCount = {
            idUserDonator: item.idUserDonator,
            cantidad: 1,
            nombre: item.nombre,
          };
          ranking.push(rankingCount);
        } else {
          ranking[result].cantidad = ranking[result].cantidad + 1;
        }
      }
    });

    ranking.sort((a, b) => {
      return b.cantidad - a.cantidad;
    });

    ranking.map((rank) => {
      const elemento = rank.idUserDonator;
      const cantidad = rank.cantidad;
      const nombre = rank.nombre;
      if (!rankingFinal.includes(rank.idUserDonator)) {
        rankingFinal.push(elemento);
        cantidadFinal.push(cantidad);
        nombresFinal.push(nombre);
      }
    });
    setArrayNombres(nombresFinal);
    setArrayRanking(rankingFinal);
    setCantidadRanking(cantidadFinal);
  }, []);

  if (size(arrayRanking)) {
    data = {
      labels: [
        "",
        arrayNombres[0],
        arrayNombres[1],
        arrayNombres[2],
        arrayNombres[3],
      ],
      datasets: [
        {
          data: [
            0,
            arrayCantidad[0],
            arrayCantidad[1],
            arrayCantidad[2],
            arrayCantidad[3],
          ],
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
    barPercentage: 1,
    useShadowColorFromDataset: false,
    decimalPlaces: 0, // optional,
  };

  if (!arrayFinal) return <Loading show text="Cargando" />;

  if (size(delivered) == 0 || size(datosPersonales) == 0)
    return <NoEstadistica texto={"No hay estadísticas suficientes"} />;

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.statisticsType}>
        Objetos mas necesitados por usuarios:
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
          paddingLeft="5"
          //absolute //for the absolute number remove if you want percentage
        />
      ) : (
        // <NotFound texto={"No hay estadisticas"} />
        <NoEstadistica texto={"No hay estadística"} />
      )}

      <Text style={styles.statisticsType}>Usuarios con mas donaciones:</Text>

      {size(arrayRanking) != 0 ? (
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
  );
}
