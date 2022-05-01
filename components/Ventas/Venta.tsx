import React from "react";
import { View, Text } from "../Themed";

import { StyleSheet, Button, Alert } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { showDetailsSalesModal } from "../../redux/actions";

interface Props {
    id: Number;
    products: Array<any>;
    client: string;
    total: number;
    status: string;
    details: string;
    paidWay: string;
    createdAt: string;
}
export default function Venta(props: Props) {
    const dispatch = useDispatch();
    const [date, setDate] = React.useState("");
    React.useEffect(() => {
        const date = new Date(props.createdAt.split("/")[0]);
        const aux = date.toLocaleDateString().split("/");
        setDate([aux[1], aux[0], aux[2]].join("/"));
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.containerFecha}>Fecha: {date}</Text>
            <View style={styles.containerBottom}>
                {/* Logo */}
                <Text>{props.client}</Text>
                <Text>Total: $ {props.total}</Text>
                <View style={styles.button}>
                    <Button
                        title="Detalles"
                        onPress={() => dispatch(showDetailsSalesModal({ show: true, products: props.products }))}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: 390,
        height: 80,
        backgroundColor: "#555",
        margin: 5,
        borderRadius: 10,
    },
    containerFecha: {
        margin: 5,
    },
    button: {
        width: 130,
        backgroundColor: "transparent",
    },
    containerBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#555",
    },
});
