import React from "react";

import { View, Text } from "../Themed";

import { StyleSheet, Modal, Dimensions, Pressable, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { showDetailsSalesModal } from "../../redux/actions";

export default function SellDetails() {
    const modal = useSelector((state: any) => state.detailsSalesModal);
    const dispatch = useDispatch();

    const [modalProduct, setModalProduct] = React.useState(modal.show);

    React.useEffect(() => {
        setModalProduct(modal.show);
    }, [modal]);

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
                        <View style={styles.listContainer}>
                            <Text style={styles.list}>Nombre</Text>
                            <Text style={styles.list}>Peso/Cantidad</Text>
                            <Text style={styles.list}>Precio un.</Text>
                            <Text style={styles.list}>SubTotal</Text>
                        </View>
                        {modal.products?.map((el: any, index: any) => {
                            return (
                                <View key={index + "products"} style={styles.listContainer}>
                                    <Text style={styles.list}>{el.name}</Text>
                                    <Text style={styles.list}>
                                        {el.quantity + " " + (el.sell_unit === "unitario" ? "un." : el.sell_unit)}
                                    </Text>
                                    <Text style={styles.list}>{el.sell_price}</Text>
                                    <Text style={styles.list}>{el.sell_price * el.quantity}</Text>
                                </View>
                            );
                        })}
                        <View style={styles.flexButtons}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    dispatch(showDetailsSalesModal({ show: false, products: [] }));
                                }}
                            >
                                <Text>Imprimir</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => dispatch(showDetailsSalesModal({ show: false, products: [] }))}
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
        width: Dimensions.get("window").width * 0.95,
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
    // Row of list
    listContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    list: {
        fontSize: 11,
        width: "25%",
        paddingLeft: 4,
    },
});
