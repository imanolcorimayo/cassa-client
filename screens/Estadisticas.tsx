import { StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { View, Text } from "../components/Themed";
import { Alert, Button } from "react-native";
import TopButtons from "../components/TopButtons";

// React Navigation
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSales, setScreenState } from "../redux/actions";

// Line Chart
import { LineChart, BarChart } from "react-native-chart-kit";

// Colors
import Colors from "../constants/Colors";

export default function Fiados({ navigation }: RootTabScreenProps<"TabFour">) {
  const dispatch = useDispatch();
  // Used to change the function of the PLUS tab bottom bar button
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setScreenState("sell"));
    }, [])
  );
  return (
    <View style={styles.container}>
      <TopButtons firstButton="Ingresos" secondButton="Gastos" />

      <ScrollView style={styles.containerScroll}>
        <Text style={styles.subTitles}>Resumen de ventas</Text>
        <View style={{ display: "flex", alignItems: "center" }}>
          <LineChart
            data={{
              labels: ["En.", "Feb.", "Mar.", "Abr.", "May.", "Jun."],
              datasets: [
                {
                  data: [100, 95, 34, 64, 95, 51],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={220}
            withInnerLines={false}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={8} // optional, defaults to 1
            chartConfig={{
              backgroundColor: Colors.primary.tint,
              backgroundGradientFrom: Colors.primary.tint,
              backgroundGradientTo: Colors.primaryDark.tint,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 5,
            }}
          />
        </View>
        <Text style={styles.subTitles}>Ventas</Text>
        <View style={{ display: "flex", alignItems: "center" }}>
          <BarChart
            data={{
              labels: ["Lun.", "Mar.", "Mier.", "Jue.", "Vier."],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="K"
            chartConfig={{
              backgroundColor: Colors.primary.tint,
              backgroundGradientFrom: Colors.primary.tint,
              backgroundGradientTo: Colors.primaryDark.tint,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderColor: "#000",
                borderWidth: 5,
                width: 50,
              },
            }}
            withInnerLines={false}
            verticalLabelRotation={0}
            style={{
              marginVertical: 8,
              borderRadius: 5,
            }}
            showValuesOnTopOfBars={true}
          />
        </View>
        <Text style={styles.subTitles}>Clientes y productos mas vendidos</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    height: Dimensions.get("window").height,
    padding: 20,
  },
  button: {
    width: 150,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
  },
  subTitles: {
    fontSize: 20,
    padding: 15,
  },
  containerScroll: {
    display: "flex",
    marginBottom: 150,
  },
});
