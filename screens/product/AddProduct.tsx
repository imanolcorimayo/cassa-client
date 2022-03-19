import { StyleSheet } from "react-native";
import React from "react";

// Components
import { View, Text } from "../../components/Themed";
import { ScrollView, Button, Alert, TextInput } from "react-native";

// Modules
import axios from "axios";

export default function AddProductos() {
    const [name, setName] = React.useState("");

    function onChangeName(event: any) {
        setName(event);
    }

    return (
        <View>
            <Text>Nuevo Producto</Text>
            <View style={styles.containerInput}>
                <Text>Aqui va a ir una imagen</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="useless placeholder"
                />
            </View>
            <Text>Categoría</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="useless"
            />
            <View style={styles.grid}>
                <View>
                    <Text>Unidad de compra</Text>
                    <TextInput style={styles.input} onChangeText={onChangeName} value={name} />
                </View>
                <View>
                    <Text>Unidad de venta</Text>
                    <TextInput style={styles.input} onChangeText={onChangeName} value={name} />
                </View>
                <View>
                    <Text>Percio de compra</Text>
                    <TextInput style={styles.input} onChangeText={onChangeName} value={name} />
                </View>
                <View>
                    <Text>Precio de venta</Text>
                    <TextInput style={styles.input} onChangeText={onChangeName} value={name} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {},
    grid: {},
    input: {
        backgroundColor: "#fff",
        height: 40,
        fontSize: 20,
    },
});
