import { View, Text } from "../Themed";

import { StyleSheet, Button, Alert, Image, Modal } from "react-native";

import { RootTabScreenProps } from "../../types";

// Redux
import { showProductModal } from "../../redux/actions";
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
    navigation: any;
}

export default function Producto(props: Props) {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.containerBottom}>
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
                    <View style={styles.button}>
                        <Button title="Detalles" onPress={() => dispatch(showProductModal(props.id))} />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Editar"
                            onPress={() => props.navigation.navigate("AddProduct", { update: true, product: props })}
                        />
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
        backgroundColor: "#555",
        borderRadius: 5,
    },
    buttons: {
        width: 100,
        backgroundColor: "transparent",
    },
    button: {
        margin: 5,
    },
    containerBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 5,
        alignItems: "center",
        backgroundColor: "#555",
    },
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
