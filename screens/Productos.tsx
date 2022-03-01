import { StyleSheet } from 'react-native';
import React from 'react';

import { RootTabScreenProps } from '../types';

// Components
import { View, Text, } from '../components/Themed';
import { TextInput, ScrollView } from 'react-native';
import CommerceAvatar from '../components/CommerceAvatar';
import Producto from '../components/Productos/Producto';
import Ordenar from '../components/Generales/Ordenar';
import Add from '../components/Ventas/Add';

export default function Productos({ navigation }: RootTabScreenProps<'TabThree'>) {
    const [number, onChangeNumber] = React.useState("something");
    const arr = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14
    ]
  return (
    <View style={styles.container}>
        <Add></Add>
        <CommerceAvatar/>
        <View style={styles.containerInput}>
            <Text>Escribe palabras clave...</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            />
        </View>
        <Ordenar></Ordenar>
        <ScrollView style={styles.containerScroll}>
            {
                arr.map((el) => {
                    return (
                        <Producto key={el}></Producto>
                    )
                })
            }
            <Text></Text>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {

    },
    input: {
      height: 40,
      width: 350,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 15
    },
    containerInput: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
    },
    containerScroll: {
        display: 'flex',
        padding: 5,
        marginBottom: 220,
    }
});