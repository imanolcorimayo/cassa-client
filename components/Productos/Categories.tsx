import { View, Text } from "../Themed";

import { StyleSheet, ScrollView } from "react-native";

// Redux
import { useDispatch } from "react-redux";

// Components
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Colors
import Colors from "../../constants/Colors";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={25} {...props} />;
}
function MaterialIcons(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  style: Object;
}) {
  return <MaterialCommunityIcons size={33} {...props} />;
}

export default function Categories() {
  const dispatch = useDispatch();
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView style={styles.scrollContainer} horizontal={true}>
        {array.map((el, index) => {
          return (
            <View style={styles.category} key={index + el}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#555",
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginBottom: 3,
                  borderColor: "#666",
                  borderWidth: 2,
                }}
              >
                <MaterialIcons
                  name={index % 2 == 0 ? "apple" : "fruit-cherries"}
                  color={Colors.primary.tint}
                  style={{
                    textShadowColor: "rgba(236, 236, 236, 0.3)",
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 2,
                  }}
                />
              </View>
              <Text style={{ fontSize: 10 }}>Verdura</Text>
            </View>
          );
        })}

        <View style={styles.category}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#555",
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <TabBarIcon name="plus" color={"#ccc"} />
          </View>
          <Text style={{ fontSize: 10 }}>Agregar</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    marginTop: 15,
  },
  scrollContainer: {
    backgroundColor: "#111",
  },
  category: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 85,
    height: 68,
    marginRight: 1,
  },
  // Text
  title: {
    fontSize: 20,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 3,
  },
});
