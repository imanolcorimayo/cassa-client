import { StyleSheet } from "react-native";
import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { View, Text } from "../components/Themed";
import { ScrollView, Button, Alert } from "react-native";
import { Link } from "@react-navigation/native";
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
        (async function () {
            try {
                const { data } = await axios.get("http://192.168.0.230:3001/product");
                setProducts(data);
            } catch (error) {
                //alert("we can't connect with server");
                console.log(error);
            }
        })();
        dispatch(getProducts());
    }, []);

    React.useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <View>
            <CommerceAvatar />
            <View style={styles.addButton}>
                <Button title="Add product" onPress={() => Alert.alert("some")} />

                <Link to={{ screen: "AddProduct" }}>Go to Jane's profile</Link>
            </View>
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

                <View style={styles.topButtons}>
                    <Button
                        title={products}
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
    addButton: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
    },
});
