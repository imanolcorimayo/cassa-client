import React from "react";
import { StyleSheet, TouchableOpacity, Button, Alert } from "react-native";

import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

interface Props {
  firstButton: String;
  secondButton: String;
}

export default function TopButtons(props: Props) {
  return (
    <View style={styles.topButtonsContainer}>
      <View style={styles.topButtons}>
        <Button
          title={props.firstButton}
          color={Colors.primaryDark.tint}
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
      </View>
      <View style={styles.topButtons}>
        <Button
          title={props.secondButton}
          color={Colors.primaryDark.tint}
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  topButtons: {
    margin: 5,
    flex: 1,
  },
});
