import { View, Text } from "../Themed";

import { StyleSheet, } from "react-native";

export default function Venta() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Agregar</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#be0',
        margin: 5,
        position: 'absolute',
        zIndex: 15,
        top: 580,
        right: 15,
        borderRadius: 40,
    },
    text: {
        color: '#000',
        fontSize: 15,
    }
  });