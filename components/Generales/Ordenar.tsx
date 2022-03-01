import { View, Text } from "../Themed";

import { StyleSheet, Button, Alert} from "react-native";


export default function Ordenar() {
    return (
        <View style={styles.container}>
            <Text>Ordenar por:</Text>
            <View style={styles.button}>
                <Button
                    color={'#aaa'}
                    title="A-Z"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    color={'#aaa'}
                    title="Z-A"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15

    },
    button: {
        width: 80,
        backgroundColor: 'transparent',
        marginLeft: 15
    },
  });