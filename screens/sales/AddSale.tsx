import { Dimensions, StyleSheet, Modal, Alert, Pressable } from "react-native";
import React from "react";

// Components
import { View, Text } from "../../components/Themed";

// Modules
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";

export default function AddSale({ navigation }: any) {
    const [modalProduct, setModalProduct] = React.useState(false);
    const [total, setTotal] = React.useState(0);
    const { products, selectProducts } = useSelector((state: any) => state);
    React.useEffect(() => {
        for (let i = 0; i < products.length; i++) {
            // To don't assume that they have the same order
            for (let j = 0; j < selectProducts.length; j++) {
                if (products[i].id === selectProducts[j]?.id && products[i].quantity !== selectProducts[j]?.quantity) {
                    const difference = products[i].quantity - selectProducts[j].quantity;
                    setTotal(total + products[i].sellPrice * difference);
                }
            }
        }
    }, [selectProducts]);
    return (
        <View style={styles.container}>
            {/* MODAL */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalProduct}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>¿Prefiere seleccionar productos o cargar manualmente?</Text>
                        <View style={styles.flexButtons}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalProduct(false);
                                    navigation.navigate("SelectProduct");
                                }}
                            >
                                <Text>Seleccionar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalProduct(false)}
                            >
                                <Text>Manual</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => setModalProduct(false)}
                            >
                                <Text style={styles.textStyle}>Volver</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable style={styles.title} onPress={() => setModalProduct(true)}>
                <Text>Productos</Text>
            </Pressable>
            <View style={styles.title}>
                <Text>Cliente</Text>
            </View>
            <View style={styles.containerDate}>
                <View style={styles.dateTitle}>
                    <Text>Fecha</Text>
                </View>

                <View style={styles.containerOptions}>
                    <View style={styles.titleOptions}>
                        <Text>Pagado</Text>
                    </View>
                    <View style={styles.titleOptions}>
                        <Text>Fiar</Text>
                    </View>
                </View>
            </View>
            <View style={styles.title}>
                <Text>Detalles</Text>
            </View>
            <View style={styles.title}>
                <Text>Forma de pago</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // MODAL
    flexButtons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    centeredView: {
        backgroundColor: "rgba(52, 52, 52, 0.90)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        width: Dimensions.get("window").width,
        padding: 20,
    },
    modalView: {
        margin: 10,
        backgroundColor: "#000",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        width: Dimensions.get("window").width / 4,
        margin: 5,
        marginTop: 20,
        backgroundColor: "#51f",
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    // MODAL
    container: {
        display: "flex",
        alignItems: "center",
        width: Dimensions.get("screen").width,
    },
    title: {
        height: 50,
        width: "95%",
        backgroundColor: "#555",
        margin: 15,
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 5,
    },

    // Container date
    containerDate: {
        display: "flex",
        flexDirection: "row",
        width: "95%",
        justifyContent: "space-between",
    },
    dateTitle: {
        height: 50,
        width: "45%",
        backgroundColor: "#555",
        margin: 0,
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 5,
    },

    // Container options
    containerOptions: {
        height: 50,
        width: "45%",
        margin: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleOptions: {
        height: 50,
        width: "48%",
        backgroundColor: "#555",
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 5,
    },
});
