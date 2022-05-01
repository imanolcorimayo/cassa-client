import React from "react";

import { View, Text } from "../Themed";

import { StyleSheet, Modal, Dimensions, Pressable, Alert } from "react-native";

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

export default function SellDetails(props: Props) {
    const [modalProduct, setModalProduct] = React.useState(false);
    return (
        <View>
            {/* MODAL TO PRODUCTS */}

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
});
