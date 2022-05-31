import React from "react";

import { RootTabScreenProps } from "../types";

// Components
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, Button, Alert, Dimensions, Pressable, StyleSheet, Modal, TextInput, Animated } from "react-native";
import { View, Text } from "../components/Themed";
import Producto from "../components/Productos/Producto";
import Categories from "../components/Productos/Categories";
import Ordenar from "../components/Generales/Ordenar";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts, showProductModal } from "../redux/actions";

// Colors
import Colors from "../constants/Colors";

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

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function Productos({ navigation }: RootTabScreenProps<"TabThree">) {
  const dispatch = useDispatch();
  const products: any = useSelector((state: any) => state.products);
  const modal: ModalInterface = useSelector((state: any) => state.modal);

  const [product, setProducts] = React.useState([]);
  const [number, onChangeNumber] = React.useState("");

  React.useEffect(() => {
    if (!product.length) dispatch(getProducts());
  }, []);

  React.useEffect(() => {
    setProducts(products);
  }, [products]);

  const [showModal, setShowModal] = React.useState(false);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [showModal]);
  const toggleModal = () => {
    if (showModal) {
      setShowModal(true);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const [visible, setVisible] = React.useState(false);
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

      {/* <View style={styles.addButton}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("AddProduct")}>
          <Text>Añadir producto</Text>
        </Pressable>
      </View> */}
      <View style={styles.topButtonsContainer}>
        <View style={styles.topButtons}>
          <Button
            title="Productos/Stock"
            color={Colors.primaryDark.tint}
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          />
        </View>
        <View style={styles.topButtons}>
          <Button
            title="Historial"
            color={Colors.primaryDark.tint}
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          />
        </View>
      </View>

      <View style={styles.input}>
        {/* @ts-ignore */}
        <TabBarIcon style={{ flex: 1 }} name="search" color={"#ccc"} />
        <TextInput
          style={{ flex: 7 }}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="¿Qué estas buscando?"
          keyboardType="numeric"
        />
        <View style={[{ flex: 0.7, backgroundColor: "transparent", height: "100%" }]}>
          <Pressable onPress={() => setShowModal(!showModal)}>
            <TabBarIcon name="filter" color={"#999"} />
          </Pressable>
          <Animated.View
            style={[
              {
                position: "relative",
                right: 150,
                width: 150,
                backgroundColor: "white",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 5,
                elevation: 10,
                paddingLeft: 15,
                paddingRight: 15,
              },
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            <Text style={{ color: "black" }}>A - Z</Text>
            <Text style={{ color: "black" }}>Z - A</Text>
            <Text style={{ color: "black" }}>Stock {"->"}</Text>
            <Text style={{ color: "black" }}>Stock {"<-"}</Text>
          </Animated.View>
        </View>
      </View>
      <Categories></Categories>
      {/* <Ordenar></Ordenar> */}
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
  buttonClose: {
    backgroundColor: Colors.primaryDark.tint,
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
    backgroundColor: "#111",
    height: Dimensions.get("window").height,
    padding: 20,
  },
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
  input: {
    position: "relative",
    zIndex: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 15,
  },
  containerInput: {
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  containerScroll: {
    display: "flex",
    marginBottom: 150,
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
    backgroundColor: Colors.primaryDark.tint,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  // Custom Popup
  modalBackGround: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
