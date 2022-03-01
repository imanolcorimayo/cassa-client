import { View, Text } from "../Themed";

import { StyleSheet, Button, Alert } from "react-native";

export default function Venta() {
    return (
        <View style={styles.container}>
           <Text style={styles.containerFecha}>Fecha</Text>
           <View style={styles.containerBottom}>
               {/* Logo */}
               <Text>Nombre</Text>
               <Text>Total: $50000</Text>
               <View style={styles.button}>
                    <Button
                            title="Detalles"
                            onPress={() => Alert.alert('Button with adjusted color pressed')}
                    />
               </View>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: 390,
        height: 80,
        backgroundColor: '#555',
        margin: 5,
        borderRadius: 10,
    },
    containerFecha: {
        margin: 5
    },
    button: {
        width: 130,
        backgroundColor: 'transparent'
    },
    containerBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#555'
    },
  });