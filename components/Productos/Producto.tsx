import { View, Text } from "../Themed";

import { StyleSheet, Button, Alert, Image } from "react-native";

export default function Producto() {
    return (
        <View style={styles.container}>
            <View style={styles.containerBottom}>
                {/* Logo */}
                <View>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: 'https://t2.uc.ltmcdn.com/images/4/0/5/cuales_son_las_frutas_de_invierno_7504_600.jpg'
                        }}

                    />
                    <Text style={styles.text }>Nombre</Text>
                </View>
                <View>
                    <Text style={styles.text }>Stok:</Text>
                    <Text style={styles.text }>50 kg</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Detalles"
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                    />
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
        justifyContent: 'center',
        width: 390,
        height: 100,
        margin: 5,
        backgroundColor: '#555',
        borderRadius: 5,
    },
    button: {
        width: 100,
        backgroundColor: 'transparent'
    },
    containerBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#555'
    },
    logo: {
      width: 90,
      height: 70,
      borderRadius: 5,
    },
    text: {
        backgroundColor: '#555'
    }
  });