import { StyleSheet } from 'react-native';
import React from 'react';

import { RootTabScreenProps } from '../types';

// Components
import { View, Text, } from '../components/Themed';
import { ScrollView } from 'react-native';
import CommerceAvatar from '../components/CommerceAvatar';
import Fiado from '../components/Fiados/Fiado';
import Ordenar from '../components/Generales/Ordenar';
import Add from '../components/Fiados/Add';

export default function Fiados({ navigation }: RootTabScreenProps<'TabTwo'>) {
    const arr = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14
    ]
  return (
    <View style={styles.container}>
        <Add></Add>
        <CommerceAvatar/>
        <Ordenar></Ordenar>
        <Text style={styles.subTitles}>Pendientes ...</Text>
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
        <Text style={styles.subTitles}>Historial ...</Text>
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
    containerScroll: {
        display: 'flex',
        padding: 5,
        height: 224,
    },
    subTitles: {
        fontSize: 20,
        paddingLeft: 15
    }
});