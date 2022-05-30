import { View, Text } from "../Themed";

import { StyleSheet, Button, Alert, Image, Pressable } from "react-native";

// Redux
import { showProductModal } from "../../redux/actions";
import { useDispatch } from "react-redux";

interface Props {
  id: Number;
  name: String;
  stock: Number;
  sellUnit: String;
  buyUnit: String;
  buyPrice: String;
  sellPrice: String;
  type: String;
  key: Number;
  quantity: Number;
  navigation: any;
}

export default function Producto(props: Props) {
  const dispatch = useDispatch();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("AddProduct", {
          update: true,
          product: {
            id: props.id,
            name: props.name,
            sellUnit: props.sellUnit,
            buyUnit: props.buyUnit,
            buyPrice: props.buyPrice,
            sellPrice: props.sellPrice,
            type: props.type,
            quantity: props.quantity,
          },
        })
      }
    >
      <View style={styles.containerOne}>
        {/* Img */}
        <Image
          style={styles.logo}
          source={{
            uri: "https://t2.uc.ltmcdn.com/images/4/0/5/cuales_son_las_frutas_de_invierno_7504_600.jpg",
          }}
        />
      </View>
      <View style={styles.containerTwo}>
        <View style={styles.containerTwo_first}>
          {/* Date and status (Could be related to the stock) */}
          <Text style={styles.text}>19 Julio de 2022</Text>
          <View
            style={{
              backgroundColor: "rgba(127, 182, 133, 1)",
              height: "100%",
              flex: 0.4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            {/* status */}
            <Text style={[styles.text, { color: "white", fontWeight: "bold", letterSpacing: 1 }]}>Full</Text>
          </View>
        </View>
        <View style={styles.containerTwo_second}>
          {/* Name of product */}
          <Text style={styles.textName}>{props.name}</Text>
        </View>
        <View style={styles.containerTwo_third}>
          {/* Stock, number of visits, messages */}
          <Text style={styles.textStock}>
            Stk: {props.stock} {props.sellUnit}
          </Text>
          <Text style={styles.textStock}>V: $ {props.sellPrice}</Text>
          <Text style={styles.textStock}>C: $ {props.buyPrice}</Text>
        </View>
      </View>
      {/* <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="Detalles" onPress={() => dispatch(showProductModal(props.id))} />
          </View>
          <View style={styles.button}>
            <Button
              title="Editar"
              onPress={() =>
                props.navigation.navigate("AddProduct", {
                  update: true,
                  product: {
                    id: props.id,
                    name: props.name,
                    sellUnit: props.sellUnit,
                    buyUnit: props.buyUnit,
                    buyPrice: props.buyPrice,
                    sellPrice: props.sellPrice,
                    type: props.type,
                    quantity: props.quantity,
                  },
                })
              }
            />
          </View>
        </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 115,
    padding: 6,
    paddingRight: 11,
    marginBottom: 7,
    marginTop: 7,
    backgroundColor: "#555",
    borderRadius: 10,
    borderColor: "#666",
    borderWidth: 2,
    shadowColor: "#fff",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
  },
  containerOne: {
    flex: 1,
    marginRight: 5,
    overflow: "hidden",
    borderRadius: 10,
  },
  containerTwo: {
    display: "flex",
    height: "100%",
    backgroundColor: "#555",
    paddingLeft: 7,
    flex: 2,
  },
  containerTwo_first: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#555",
    flex: 1,
  },
  containerTwo_second: {
    display: "flex",
    justifyContent: "center",
    flex: 1.8,
    backgroundColor: "#555",
  },
  containerTwo_third: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#555",
    flex: 1,
  },
  textName: {
    fontSize: 18,
    letterSpacing: 1.5,
    fontWeight: "bold",
  },
  textStock: {
    fontSize: 12,
    fontWeight: "normal",
    letterSpacing: 1,
  },
  text: {
    fontSize: 11,
    fontWeight: "800",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
