import React from "react";

import { View, Text } from "../Themed";

import { StyleSheet, Button, Alert, Image, TextInput } from "react-native";

// Redux
import { newStockProducts, reorderProducts } from "../../redux/actions";
import { useDispatch } from "react-redux";

interface Props {
    id: Number;
    name: String;
    stock: Number;
    sellUnit: String;
    buyUnit: String;
    buyPrice: String;
    sellPrice: String;
    type: String;
    key: Number;
    quantity: Number;
    sellQuantity: Number;
}

export default function Product(props: Props) {
    const [quantity, setQuantity] = React.useState(props.sellQuantity ? props.sellQuantity : "");
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (quantity) {
            // TODO This below's dispatch isn't working as spect, fix it
            //dispatch(reorderProducts(props.id));
        }
        dispatch(newStockProducts(props.id, quantity ? quantity : 0));
    }, [quantity]);

    return (
        <View
            style={[
                styles.container,
                quantity ? (props.stock < 0 ? styles.wrong : styles.selected) : styles.notSelected,
            ]}
        >
            <View
                style={[
                    styles.containerBottom,
                    quantity
                        ? props.stock < 0
                            ? styles.bottomWrong
                            : styles.bottomSelected
                        : styles.bottomNotSelected,
                ]}
            >
                {/* Logo */}
                <View>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: "https://t2.uc.ltmcdn.com/images/4/0/5/cuales_son_las_frutas_de_invierno_7504_600.jpg",
                        }}
                    />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textName}>{props.name}</Text>
                    <Text>
                        Stok: {props.stock} {props.sellUnit}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="0"
                            style={styles.input}
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={(quantity) => setQuantity(quantity)}
                        />
                        <Text style={{ width: "30%", textAlign: "center" }}>
                            {props.sellUnit === "unitario" ? "un." : props.sellUnit}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        width: 390,
        height: 100,
        margin: 5,
        borderRadius: 5,
    },
    selected: {
        backgroundColor: "#00ff00",
    },
    wrong: {
        backgroundColor: "#ff0000",
    },
    notSelected: {
        backgroundColor: "#555",
    },
    buttons: {
        width: 100,
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 5,
    },
    inputContainer: {
        margin: 5,
        width: "100%",
        backgroundColor: "#aaa",
        height: 40,
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
    },
    input: {
        backgroundColor: "#ddd",
        height: "100%",
        width: "70%",
        paddingLeft: 5,
    },
    containerBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 5,
        alignItems: "center",
        backgroundColor: "#555",
    },
    bottomSelected: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#00ff00",
    },
    bottomWrong: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ff0000",
    },
    bottomNotSelected: {},
    logo: {
        width: 120,
        height: "100%",
        borderRadius: 5,
    },
    // Container text
    containerText: {
        backgroundColor: "#555",
        width: 120,
    },
    textName: {
        fontSize: 16,
        marginBottom: 8,
    },
});
