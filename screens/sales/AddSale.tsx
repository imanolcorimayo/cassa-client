import { Dimensions, StyleSheet, Modal, Alert, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React from "react";

// Components
import { View, Text } from "../../components/Themed";

// Modules
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../redux/actions";

export default function AddSale({ navigation, route }: any) {
    const dispatch = useDispatch();
    const [modalProduct, setModalProduct] = React.useState(false);
    const [modalClient, setModalClient] = React.useState(false);
    const [modalDetails, setModalDetails] = React.useState(false);
    const [form, setForm] = React.useState({
        client: "",
        date: "",
        status: route.params.type,
        details: "",
        paidWay: "MP",
    });
    const [total, setTotal] = React.useState(0);
    const { newSell } = useSelector((state: any) => state);
    React.useEffect(() => {
        let total = 0;
        for (let i = 0; i < newSell.products.length; i++) {
            // To don't assume that they have the same order
            const totalElement = newSell.products[i].sell_price * newSell.products[i].quantity;
            total += totalElement;
        }
        setTotal(total);
    }, [newSell]);
    React.useEffect(() => {
        console.log("PARAMS", route.params.type);
        var today = new Date();
        const aux = today.toLocaleDateString("es-AR").split("/");
        setForm({ ...form, date: [aux[1], aux[0], aux[2]].join("/") });
    }, []);

    async function handleSell() {
        // TODO add validations
        try {
            const data = await axios.post("http://192.168.0.230:3001/sales", {
                ...form,
                products: newSell.products,
                total,
            });
            if (data.status === 400) {
                Alert.alert("faltan datos");
            } else if (data.status === 200) {
                Alert.alert(data.data);
                dispatch(getSales());
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
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
            {/* MODAL TO CLIENT */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalClient}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Nombre del cliente</Text>
                        <View style={[styles.flexButtons, styles.inputContainer]}>
                            <TextInput
                                placeholder="Nombre del cliente"
                                value={form.client}
                                onChangeText={(client) => setForm({ ...form, client })}
                                style={styles.input}
                            />
                        </View>
                        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalClient(false)}>
                            <Text style={styles.textStyle}>Volver</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* MODAL TO DETAILS */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDetails}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Detalles de la venta</Text>
                        <View style={[styles.flexButtons, styles.inputContainer]}>
                            <TextInput
                                placeholder="En esta venta se añadieron productros de regalo..."
                                multiline={true}
                                value={form.details}
                                onChangeText={(details) => setForm({ ...form, details })}
                                style={styles.inputDetails}
                            />
                        </View>
                        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalDetails(false)}>
                            <Text style={styles.textStyle}>Volver</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* PICKER */}

            {/* <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={form.paidWay}
                    onValueChange={(itemValue) => setForm({ ...form, paidWay: itemValue })}
                >
                    <Picker.Item label="Mercado Pago" value="MP" />
                    <Picker.Item label="Efectivo" value="cash" />
                    <Picker.Item label="Otro" value="other" />
                </Picker>
            </View> */}

            <Pressable style={styles.title} onPress={() => setModalProduct(true)}>
                <Text>Productos: </Text>
                <Text>TOTAL: {total} $ </Text>
            </Pressable>
            <Pressable style={styles.title} onPress={() => setModalClient(true)}>
                <Text>Cliente: </Text>
                <Text>{form.client}</Text>
            </Pressable>
            <View style={styles.containerDate}>
                <View style={styles.dateTitle}>
                    <Text>Fecha: </Text>
                    <Text>{form.date}</Text>
                </View>

                <View style={styles.containerOptions}>
                    <Pressable
                        style={[styles.titleOptions, form.status === "paid out" && styles.selectedOptionPaid]}
                        onPress={() => setForm({ ...form, status: "paid out" })}
                    >
                        <Text>Pagado</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.titleOptions, form.status === "trusted" && styles.selectedOptionTrust]}
                        onPress={() => setForm({ ...form, status: "trusted" })}
                    >
                        <Text>Fiar</Text>
                    </Pressable>
                </View>
            </View>
            <Pressable
                style={styles.title}
                onPress={() => {
                    setModalDetails(true);
                }}
            >
                <Text>Detalles</Text>
            </Pressable>
            {form.details ? <Text style={styles.textDetails}>{form.details}</Text> : <></>}
            {form.status === "paid out" ? (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={form.paidWay}
                        onValueChange={(itemValue) => setForm({ ...form, paidWay: itemValue })}
                        mode={"dropdown"}
                    >
                        <Picker.Item label="Mercado Pago" value="MP" style={styles.pickerText} />
                        <Picker.Item label="Efectivo" value="cash" style={styles.pickerText} />
                        <Picker.Item label="Otro" value="other" style={styles.pickerText} />
                    </Picker>
                </View>
            ) : (
                <></>
            )}

            <View style={styles.sellButtonContainer}>
                <Pressable style={styles.sellButton} onPress={handleSell}>
                    <Text>Vender!</Text>
                </Pressable>
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
    inputContainer: {
        width: "100%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    inputDetails: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: "100%",
        height: Dimensions.get("window").height / 6,
    },
    // MODAL
    container: {
        display: "flex",
        alignItems: "center",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
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

    textDetails: {
        width: "95%",
        margin: 15,
        padding: 5,
    },
    textDetailsEmpty: {
        width: 0,
        height: 0,
        margin: 0,
        padding: 0,
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
    selectedOptionPaid: {
        backgroundColor: "#11ad84",
    },
    selectedOptionTrust: {
        backgroundColor: "#aa1184",
    },

    // Picker
    pickerContainer: {
        height: 50,
        width: "95%",
        backgroundColor: "#555",
        margin: 15,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#aaa",
        paddingTop: 0,
        overflow: "hidden",
    },
    pickerText: {
        color: "white",
        fontSize: 14,
        backgroundColor: "#555",
    },

    sellButtonContainer: {
        position: "absolute",
        bottom: 180,
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    sellButton: {
        width: Dimensions.get("window").width * 0.7,
        backgroundColor: "#51f",
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
});
