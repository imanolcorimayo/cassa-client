//import {} from "react";

import { View, Text } from "./Themed";
import { Image } from "react-native";

import { StyleSheet } from "react-native";

export default function CommerceAvatar() {
    return (
        <View style={styles.container}>
           <Image
           style={styles.logo}
           source={{
               uri: "https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png"
            }}
            />
            <View style={styles.container_text}>
                <Text>
                    Nombre del comercio
                </Text>
                <Text>
                    Dirección del comercio
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 110,
        marginLeft: 20,
    },
    container_text: {
        marginLeft: 10,
    },
    logo: {
      margin: 'auto',
      width: 66,
      height: 58,
    },
  });