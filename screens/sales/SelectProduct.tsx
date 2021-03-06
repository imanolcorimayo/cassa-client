import { StyleSheet, ScrollView } from "react-native";
import React from "react";

// Components
import { View, Text } from "../../components/Themed";
import Product from "../../components/Ventas/Product";

// Modules
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";

interface Product {
    buy_unit: String;
    createdAt: String;
    id: Number;
    name: String;
    buy_price: String;
    sell_price: String;
    quantity: Number;
    sell_unit: String;
    type: String;
    updatedAt: String;
}

export default function SelectProduct() {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.selectProducts);
    const newSell = useSelector((state: any) => state.newSell);

    React.useEffect(() => {
        if (!products.length) dispatch(getProducts());
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.containerScroll}>
                {products.map((el: Product, index: any) => {
                    const quantity = newSell.products.find((element: Product) => element.id === el.id);
                    const sellQuantity = quantity ? quantity.quantity : "";
                    return (
                        <Product
                            key={index}
                            id={el.id}
                            name={el.name}
                            stock={el.quantity}
                            sellUnit={el.sell_unit}
                            buyUnit={el.buy_unit}
                            sellPrice={el.sell_price}
                            buyPrice={el.buy_price}
                            quantity={el.quantity}
                            sellQuantity={sellQuantity}
                            type={el.type}
                        ></Product>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    containerScroll: {
        display: "flex",
        padding: 5,
        marginBottom: 180,
        height: "100%",
    },
});
