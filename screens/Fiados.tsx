import { StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { View, Text } from "../components/Themed";
import { ScrollView } from "react-native";
import CommerceAvatar from "../components/CommerceAvatar";
import Fiado from "../components/Fiados/Fiado";
import Ordenar from "../components/Generales/Ordenar";
import Add from "../components/Fiados/Add";

export default function Fiados({ navigation }: RootTabScreenProps<"TabTwo">) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    return (
        <View style={styles.container}>
            <Add></Add>
            <CommerceAvatar />
            <Ordenar></Ordenar>
            <Text style={styles.subTitles}>Pendientes ...</Text>
            <View style={styles.containerScroll}>
                <ScrollView>
                    {arr.map((el) => {
                        return <Fiado key={el}></Fiado>;
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
            <View style={styles.addButton}>
                <Pressable style={styles.button} onPress={() => navigation.navigate("AddSale", { type: "paid out" })}>
                    <Text>Añadir venta</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height * 0.8,
        width: Dimensions.get("window").width,
    },
    containerScroll: {
        display: "flex",
        padding: 5,
        height: "30%",
        backgroundColor: "#aaa",
    },
    subTitles: {
        fontSize: 20,
        paddingLeft: 15,
    },

    // Add button
    addButton: {
        position: "absolute",
        bottom: -45,
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
