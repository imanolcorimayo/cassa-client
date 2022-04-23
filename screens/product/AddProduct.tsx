import { StyleSheet } from "react-native";
import React from "react";

// Components
import { View, Text } from "../../components/Themed";
import { Button, Alert, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NumericInput from "react-native-numeric-input";

// Modules
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions";

interface Props {
    route: any;
    navigation: any;
}

export default function AddProductos(props: Props) {
    // TODO get information of category and units from database and button with add category/units
    // TODO This component should not have the name "AddProduct" because we add, delete and update products here

    const dispatch = useDispatch();

    const [form, setForm] = React.useState({
        name: "",
        category: "frutas",
        image: "",
        buyUnit: "cajones",
        sellUnit: "cajones",
        buyPrice: "",
        sellPrice: "",
        quantity: 0,
    });

    React.useEffect(() => {
        if (props.route.params && props.route.params.update) setForm(props.route.params?.product);
    }, []);

    async function onPressHandler() {
        console.log("FORRRRM: ", form);
        for (const key in form) {
            // @ts-ignore
            if (key !== "image" && !form[key]) return Alert.alert("Por favor completa todos los campos");
        }
        try {
            const data = await axios.post("http://192.168.0.230:3001/product", {
                ...form,
            });
            if (data.status === 200) {
                dispatch(getProducts());
                props.navigation.navigate("TabFive");
            } else {
                Alert.alert("Algo salio mal con el servidor. Por favor trate de nuevo mas tarde o contactenos");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Algo salio mal con el servidor. Por favor trate de nuevo mas tarde o contactenos");
        }
    }

    async function updateHandler() {
        for (const key in form) {
            // @ts-ignore
            if (key !== "image" && !form[key]) return Alert.alert("Por favor completa todos los campos");
        }
        try {
            const data = await axios.put("http://192.168.0.230:3001/product", {
                ...form,
            });
            if (data.status === 200) {
                dispatch(getProducts());
                props.navigation.navigate("TabFive");
            } else {
                Alert.alert("Algo salio mal con el servidor. Por favor trate de nuevo mas tarde o contactenos");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Algo salio mal con el servidor. Por favor trate de nuevo mas tarde o contactenos");
        }
    }

    async function deleteProduct() {
        try {
            const data = await axios.delete("http://192.168.0.230:3001/product", {
                headers: {
                    id: props.route.params?.product.id,
                },
            });
            if ((data.status = 200)) {
                Alert.alert("El producto fue eliminado exitosamente");
            } else if ((data.status = 404)) {
                Alert.alert("El producto ya fue eliminado o no existe en la base de datos");
            }
            dispatch(getProducts());
            props.navigation.navigate("TabFive");
        } catch (error) {
            console.error(error);
            Alert.alert("Algo salio mal con el servidor. Por favor trate de nuevo mas tarde o contactenos");
        }
    }

    return (
        <View style={styles.containerInput}>
            <View style={styles.containerInputImage}>
                <View style={styles.containerImage}>
                    <Text>Aqui va a ir una imagen</Text>
                </View>
                <View style={styles.containerInputName}>
                    <Text>Nombre del producto</Text>
                    <TextInput
                        style={styles.inputName}
                        onChangeText={(name) => setForm({ ...form, name })}
                        value={form.name}
                        placeholder="Nombre del producto"
                    />
                </View>
            </View>
            <View style={styles.containerCategories}>
                <Text>Categoría</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={form.category}
                        onValueChange={(itemValue) => setForm({ ...form, category: itemValue })}
                    >
                        <Picker.Item label="Frutas" value="frutas" />
                        <Picker.Item label="Verduras" value="verduras" />
                    </Picker>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <Text>Cantidad</Text>
                <View style={styles.quantity}>
                    {/* TODO fix render "0" when we try to update the product */}
                    <NumericInput
                        value={form.quantity}
                        onChange={(quantity) => {
                            if (quantity >= 0) {
                                return setForm({ ...form, quantity });
                            }
                        }}
                    />
                </View>
            </View>
            <View style={styles.containerInputUnits}>
                <View style={styles.flex}>
                    <Text>Unidad de compra</Text>
                    <View style={styles.input}>
                        <Picker
                            selectedValue={form.buyUnit}
                            onValueChange={(itemValue) => setForm({ ...form, buyUnit: itemValue })}
                        >
                            <Picker.Item label="cajones" value="cajones" />
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="g" value="g" />
                            <Picker.Item label="unitario" value="unitario" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.flex}>
                    <Text>Unidad de venta</Text>
                    <View style={styles.input}>
                        <Picker
                            selectedValue={form.sellUnit}
                            onValueChange={(itemValue) => setForm({ ...form, sellUnit: itemValue })}
                        >
                            <Picker.Item label="cajones" value="cajones" />
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="g" value="g" />
                            <Picker.Item label="unitario" value="unitario" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.flex}>
                    <Text>Percio de compra</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(buyPrice) => setForm({ ...form, buyPrice })}
                        value={form.buyPrice}
                    />
                </View>
                <View style={styles.flex}>
                    <Text>Precio de venta</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(value) => setForm({ ...form, sellPrice: value })}
                        value={form.sellPrice}
                    />
                </View>
            </View>
            {props.route.params?.update ? (
                <View style={styles.buttonEditContainer}>
                    <Button onPress={updateHandler} title="Editar producto" color="#841584" />
                    <Button onPress={deleteProduct} title="Eliminar producto" color="#f90034" />
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Button onPress={onPressHandler} title="Cargar producto" color="#841584" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    // General
    containerInput: {
        padding: 20,
        display: "flex",
        alignItems: "center",
    },

    // Container Input Image
    containerInputImage: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    containerImage: {
        width: 130,
        height: 130,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a7f",
        borderRadius: 5,
        margin: 15,
    },
    containerInputName: {
        flexGrow: 2,
    },

    // Quantity container

    quantityContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },

    quantity: {
        backgroundColor: "white",
        borderRadius: 5,
        overflow: "hidden",
        width: 125,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    // Container Input Categories
    containerCategories: {},

    // Container Input Units
    containerInputUnits: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        margin: 10,
    },
    flex: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        padding: 10,
    },

    // All inputs
    input: {
        marginTop: 5,
        backgroundColor: "#fff",
        width: "100%",
        height: 40,
        fontSize: 20,
        paddingLeft: 10,
        borderRadius: 5,
    },
    inputName: {
        marginTop: 5,
        backgroundColor: "#fff",
        width: "100%",
        height: 30,
        fontSize: 15,
        borderRadius: 5,
        paddingLeft: 5,
    },

    // Picker
    pickerContainer: {
        marginTop: 5,
        backgroundColor: "#fff",
        minWidth: "100%",
        height: 50,
        fontSize: 20,
        paddingLeft: 10,
        borderRadius: 5,
    },

    // Button
    buttonContainer: {
        width: 200,
        borderRadius: 7,
        overflow: "hidden",
        backgroundColor: "#fff",
    },

    buttonEditContainer: {
        width: "100%",
        borderRadius: 7,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
