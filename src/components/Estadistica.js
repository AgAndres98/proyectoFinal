import React, { useState, useEffect } from "react";
import { db, screen } from "../utils";
import { View, Alert } from "react-native";
import { Image, Text, Icon, Button } from "react-native-elements";
import { Loading } from "../components/Shared";

import { size, forEach } from "lodash";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { array } from "yup";

export function Estadistica(props) {
  const ranking = [];
  let arrayFinal = [];
  const delivered = props.delivered;
  const datosPersonales = props.datosPersonales;
  console.log("DATOSSS" + JSON.stringify(datosPersonales[0]));
  const arrayfiltrado = [];

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

  const filterByYear = (year) => {
    datosPersonales.forEach((element) => {
      if (element.year !== year) {
      } else {
        arrayfiltrado.push(element);
      }
      console.log(arrayfiltrado);
    });
  };

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
      if (item.population !== 0) {
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
  }, [arrayFinal]);

  useEffect(() => {
    forEach(delivered, (item) => {
      if (ranking[0] === undefined) {
        const rankingCount = {
          idUserDonator: item.idUserDonator,
          cantidad: 1,
        };
        ranking.push(rankingCount);
      } else {
        for (var i = 0; i < ranking.length; i++) {
          if (ranking[i].idUserDonator === item.idUserDonator) {
            ranking[i].cantidad = ranking[i].cantidad + 1;
          }
        }
        const rankingCount = {
          idUserDonator: item.idUserDonator,
          cantidad: 1,
        };
        ranking.push(rankingCount);
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
  }, [ranking]);

  const data = {
    labels: ranking,
    datasets: [
      {
        data: [1, 2, 3, 4],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional,
  };

  if (size(arrayFinal) == 0) return <Loading show text="Cargando" />;
  //if (!arrayFinal) return <Loading show text="Cargando" />;

  return (
    <View>
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

      {size(arrayFinal) != 0 ? (
        <PieChart
          data={arrayFinal}
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
        Usuarios con mas donaciones:
      </Text>

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
      <View>
        <Button
          title={"Ver solicitudes"}
          onPress={() => {
            filterByYear(2022);
          }}
        />
      </View>
    </View>
  );
}
