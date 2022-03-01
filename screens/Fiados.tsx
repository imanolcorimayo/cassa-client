import { StyleSheet } from 'react-native';
import React from 'react';

import { RootTabScreenProps } from '../types';

// Components
import { View, Text, } from '../components/Themed';
import { TextInput, ScrollView } from 'react-native';
import CommerceAvatar from '../components/CommerceAvatar';
import Fiado from '../components/Fiados/Fiado';
import Add from '../components/Fiados/Add';

export default function Fiados({ navigation }: RootTabScreenProps<'TabThree'>) {
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
        <Text>Pendientes ...</Text>
        <ScrollView style={styles.containerScroll}>
            {
                arr.map((el) => {
                    return (
                        <Fiado key={el}></Fiado>
                    )
                })
            }
            <Text></Text>
        </ScrollView>
        <Text>Historial ...</Text>
        <View style={styles.containerScroll}>
            <ScrollView>
                {
                    arr.map((el) => {
                        return (
                            <Fiado key={el}></Fiado>
                        )
                    })
                }
                <Text></Text>
            </ScrollView>
        </View>
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
        backgroundColor: '#bbb'
    },
    containerScroll: {
        display: 'flex',
        backgroundColor:'#bbb',
        padding: 5,
        height: 200,
    }
});