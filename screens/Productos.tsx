import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { ScrollView, Button, Alert, Dimensions, Pressable, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import CommerceAvatar from "../components/CommerceAvatar";
import Producto from "../components/Productos/Producto";
import Ordenar from "../components/Generales/Ordenar";

// Modules
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";

interface Product {
    buy_unit: String;
    createdAt: String;
    id: Number;
    name: String;
    price: String;
    quantity: Number;
    sell_unit: String;
    type: String;
    updatedAt: String;
}

export default function Productos({ navigation }: RootTabScreenProps<"TabThree">) {
    const dispatch = useDispatch();
    const products: any = useSelector((state: any) => state.products);

    const [product, setProducts] = React.useState([]);

    React.useEffect(() => {
        if (!product.length) dispatch(getProducts());
    }, []);

    React.useEffect(() => {
        setProducts(products);
    }, [products]);

    return (
        <View style={styles.container}>
            <View style={styles.addButton}>
                <Pressable style={styles.button} onPress={() => navigation.navigate("AddProduct")}>
                    <Text>Añadir producto</Text>
                </Pressable>
            </View>
            <CommerceAvatar />
            <View style={styles.topButtonsContainer}>
                <View style={styles.topButtons}>
                    <Button
                        title="Productos/Stock"
                        color={"#51f"}
                        onPress={() => Alert.alert("Button with adjusted color pressed")}
                    />
                </View>
                <View style={styles.topButtons}>
                    <Button
                        title="Historial de compra"
                        color={"#51f"}
                        onPress={() => Alert.alert("Button with adjusted color pressed")}
                    />
                </View>
            </View>
            <Ordenar></Ordenar>
            <ScrollView style={styles.containerScroll}>
                {product.map((el: Product, index) => {
                    return <Producto key={index} name={el.name} stock={el.quantity} sellUnit={el.sell_unit}></Producto>;
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
    },
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
        marginBottom: 180,
    },
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
