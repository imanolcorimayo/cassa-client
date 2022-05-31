import { StyleSheet, Dimensions } from "react-native";
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
      <Text style={styles.subTitles}>Resumen de ventas</Text>
      <Text style={styles.subTitles}>Ventas</Text>
      <Text style={styles.subTitles}>Clientes y productos mas vendidos</Text>
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
});
