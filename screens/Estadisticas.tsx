import { StyleSheet } from 'react-native';
import React from 'react';

import { RootTabScreenProps } from '../types';

// Components
import { View, Text } from '../components/Themed';
import { Alert, Button } from 'react-native';
import CommerceAvatar from '../components/CommerceAvatar';

export default function Fiados({ navigation }: RootTabScreenProps<'TabFour'>) {
  return (
    <View style={styles.container}>
        <CommerceAvatar></CommerceAvatar>
        <View style={styles.buttons}>
            <View style={styles.button}>
                <Button
                    title="Ingresos"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Gastos"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />
            </View>
        </View>
        <Text style={styles.subTitles}>Resumen de ventas</Text>
        <Text style={styles.subTitles}>Ventas</Text>
        <Text style={styles.subTitles}>Clientes y productos mas vendidos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {

    },
    button: {
        width: 150
    },
    buttons:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 15
    },
    subTitles: {
        fontSize: 20,
        padding: 15
    }
});