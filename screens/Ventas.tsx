import { StyleSheet } from "react-native";
import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { View, Text } from "../components/Themed";
import { ScrollView, Pressable, Dimensions } from "react-native";
import Venta from "../components/Ventas/Venta";
import Ordenar from "../components/Generales/Ordenar";
import SellDetails from "../components/Ventas/SellDetails";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSales, setScreenState } from "../redux/actions";

// React navigation
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

interface globalState {
  sales: Array<Object>;
  products: Array<Object>;
}

interface Sale {
  id: number;
  products: string;
  client: string;
  total: number;
  status: string;
  details: string;
  paidWay: string;
  createdAt: string;
}

export default function Ventas({ navigation }: RootTabScreenProps<"TabThree">) {
  const dispatch = useDispatch();
  const sales = useSelector((state: globalState) => state.sales);

  React.useEffect(() => {
    if (!sales.length) {
      dispatch(getSales());
    }
  }, []);
  // Used to change the function of the PLUS tab bottom bar button
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setScreenState("sell"));
    }, [])
  );
  const foc = useIsFocused();
  return (
    <View style={styles.container}>
      <SellDetails></SellDetails>
      <Ordenar></Ordenar>
      <Text>{foc ? "some" : "else"}</Text>
      <ScrollView style={styles.containerScroll}>
        {sales.map((el: any, index: any) => {
          return (
            <Venta
              key={index}
              products={JSON.parse(el.products)}
              id={el.id}
              client={el.client}
              total={el.total}
              status={el.status}
              details={el.details}
              paidWay={el.paidWay}
              createdAt={el.createdAt}
            />
          );
        })}
        <Text></Text>
      </ScrollView>
      <View style={styles.addButton}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("AddSale", { type: "paid out" })}>
          <Text>A??adir venta</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  // Button add
  containerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: "#be0",
    margin: 5,
    position: "absolute",
    zIndex: 105,
    top: 580,
    right: 15,
    borderRadius: 40,
  },
  text: {
    color: "#000",
    fontSize: 15,
  },

  // Scroll container
  containerScroll: {
    display: "flex",
    padding: 5,
    marginBottom: 180,
  },

  // Add button
  addButton: {
    position: "absolute",
    bottom: 120,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "#51f",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
