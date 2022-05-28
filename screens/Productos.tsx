import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { ScrollView, Button, Alert, Dimensions, Pressable, StyleSheet, Modal } from "react-native";
import { View, Text } from "../components/Themed";
import CommerceAvatar from "../components/CommerceAvatar";
import Producto from "../components/Productos/Producto";
import Ordenar from "../components/Generales/Ordenar";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts, showProductModal } from "../redux/actions";

interface Product {
  buy_unit: String;
  createdAt: String;
  id: Number;
  name: String;
  buy_price: String;
  sell_price: String;
  quantity: Number;
  sell_unit: String;
  type: String;
  updatedAt: String;
}

interface ModalInterface {
  visibility: boolean;
  product: Product;
}

export default function Productos({ navigation }: RootTabScreenProps<"TabThree">) {
  const dispatch = useDispatch();
  const products: any = useSelector((state: any) => state.products);
  const modal: ModalInterface = useSelector((state: any) => state.modal);

  const [product, setProducts] = React.useState([]);

  React.useEffect(() => {
    if (!product.length) dispatch(getProducts());
  }, []);

  React.useEffect(() => {
    setProducts(products);
  }, [products]);

  return (
    <View style={styles.container}>
      {/* MODAL */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modal.visibility}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          dispatch(showProductModal());
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.containerInputImage}>
              <View style={styles.containerImage}>
                <Text>Aqui va a ir una imagen</Text>
              </View>
              <View style={styles.containerInputName}>
                <Text>Nombre</Text>
                <View>
                  <Text>{modal.product?.name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsContainer}></View>

            <View style={styles.containerInputUnits}>
              <View style={styles.flex}>
                <Text>Categoría</Text>
                <View>
                  <Text>{modal.product?.type}</Text>
                </View>
              </View>
              <View style={styles.flex}>
                <Text>Stock disponible</Text>
                <View>
                  <Text>{modal.product?.quantity}</Text>
                </View>
              </View>
              <View style={styles.flex}>
                <Text>Unidad de compra</Text>
                <View>
                  <Text>{modal.product?.buy_unit}</Text>
                </View>
              </View>
              <View style={styles.flex}>
                <Text>Unidad de venta</Text>
                <View>
                  <Text>{modal.product?.sell_unit}</Text>
                </View>
              </View>
              <View style={styles.flex}>
                <Text>Percio de compra</Text>
                <View>
                  <Text>{modal.product?.buy_price}</Text>
                </View>
              </View>
              <View style={styles.flex}>
                <Text>Precio de venta</Text>
                <View>
                  <Text>{modal.product?.sell_price}</Text>
                </View>
              </View>
            </View>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => dispatch(showProductModal())}>
              <Text style={styles.textStyle}>Volver</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* END MODAL */}

      <View style={styles.addButton}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("AddProduct")}>
          <Text>Añadir producto</Text>
        </Pressable>
      </View>
      <CommerceAvatar />
      <View style={styles.topButtonsContainer}>
        <View style={styles.topButtons}>
          <Button
            title="Productos/Stock"
            color={"#51f"}
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          />
        </View>
        <View style={styles.topButtons}>
          <Button
            title="Historial de compra"
            color={"#51f"}
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          />
        </View>
      </View>
      <Ordenar></Ordenar>
      <ScrollView style={styles.containerScroll}>
        {product.map((el: Product, index) => {
          return (
            <Producto
              key={index}
              id={el.id}
              name={el.name}
              stock={el.quantity}
              sellUnit={el.sell_unit}
              buyUnit={el.buy_unit}
              sellPrice={el.sell_price}
              buyPrice={el.buy_price}
              quantity={el.quantity}
              type={el.type}
              navigation={navigation}
            ></Producto>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // MODAL

  // Details Container

  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },

  // Container Input Units
  containerInputUnits: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  flex: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    padding: 10,
  },

  // Container Input Image
  containerInputImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  containerImage: {
    width: 130,
    height: 130,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#a7f",
    borderRadius: 5,
  },
  containerInputName: {
    flexGrow: 2,
    display: "flex",
    alignItems: "center",
  },
  centeredView: {
    backgroundColor: "rgba(52, 52, 52, 0.90)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    width: Dimensions.get("window").width,
    padding: 20,
  },
  modalView: {
    margin: 10,
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  // MODAL
  container: {
    height: Dimensions.get("window").height,
    padding: 10,
  },
  topButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  topButtons: {
    margin: 5,
  },
  input: {
    height: 40,
    width: 350,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
  },
  containerInput: {
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  containerScroll: {
    display: "flex",
    marginBottom: 180,
  },
  // Add button
  addButton: {
    position: "absolute",
    bottom: 120,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "#51f",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
