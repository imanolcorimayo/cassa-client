import { StyleSheet } from "react-native";
import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { View, Text } from "../components/Themed";
import { TextInput, ScrollView, Button, Alert } from "react-native";
import CommerceAvatar from "../components/CommerceAvatar";
import Producto from "../components/Productos/Producto";
import Ordenar from "../components/Generales/Ordenar";

import axios from "axios";

export default function Productos({
    navigation,
}: RootTabScreenProps<"TabThree">) {
    const [product, setProducts] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(
                    "http://192.168.0.230:3001/product"
                );
                setProducts(data);
            } catch (error) {
                alert("we cant connect with server");
                console.log(error);
            }
        })();
    });

    return (
        <View>
            <CommerceAvatar />
            <View style={styles.topButtonsContainer}>
                <View style={styles.topButtons}>
                    <Button
                        title="Productos/Stock"
                        color={"#51f"}
                        onPress={() =>
                            Alert.alert("Button with adjusted color pressed")
                        }
                    />
                </View>
                <View style={styles.topButtons}>
                    <Button
                        title="Historial de compra"
                        color={"#51f"}
                        onPress={() =>
                            Alert.alert("Button with adjusted color pressed")
                        }
                    />
                </View>
            </View>
            <Ordenar></Ordenar>
            <ScrollView style={styles.containerScroll}>
                {product.map((el, index) => {
                    return <Producto key={index}></Producto>;
                })}
                <Text></Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    topButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    topButtons: {
        margin: 5,
    },
    input: {
        height: 40,
        width: 350,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
    },
    containerInput: {
        padding: 10,
        display: "flex",
        alignItems: "center",
    },
    containerScroll: {
        display: "flex",
        padding: 5,
        marginBottom: 220,
    },
});
