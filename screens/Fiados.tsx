import { StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { View, Text } from "../components/Themed";
import { ScrollView } from "react-native";
import Fiado from "../components/Fiados/Fiado";
import Ordenar from "../components/Generales/Ordenar";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getTrusted } from "../redux/actions";

export default function Fiados({ navigation }: RootTabScreenProps<"TabTwo">) {
  const dispatch = useDispatch();
  const trusted = useSelector((state: any) => state.trusted);
  React.useEffect(() => {
    dispatch(getTrusted());
  }, []);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <View style={styles.container}>
      <Ordenar></Ordenar>
      <Text style={styles.subTitles}>Pendientes ...</Text>
      <View style={styles.containerScroll}>
        <ScrollView>
          {trusted.map((el: any, index: any) => {
            return <Fiado key={index}></Fiado>;
          })}
          <Text></Text>
        </ScrollView>
      </View>
      <Text style={styles.subTitles}>Historial ...</Text>
      <View style={styles.containerScroll}>
        <ScrollView>
          {arr.map((el) => {
            return <Fiado key={el}></Fiado>;
          })}
          <Text></Text>
        </ScrollView>
      </View>
      <Pressable style={styles.addButton} onPress={() => navigation.navigate("AddSale", { type: "trusted" })}>
        <View style={styles.button}>
          <Text>Añadir fiado</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  containerScroll: {
    display: "flex",
    padding: 5,
    height: "20%",
    backgroundColor: "#aaa",
  },
  subTitles: {
    fontSize: 20,
    paddingLeft: 15,
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
    position: "relative",
    zIndex: 50,
    backgroundColor: "#51f",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
