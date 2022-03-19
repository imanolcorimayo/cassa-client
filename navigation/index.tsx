/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, StyleSheet } from "react-native";

// React Navigation
import { Link } from "@react-navigation/native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Ventas from "../screens/Ventas";
import Fiados from "../screens/Fiados";
import Estadisticas from "../screens/Estadisticas";
import Productos from "../screens/Productos";
import AddProduct from "../screens/product/AddProduct";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { View } from "../components/Themed";
import Auth from "../screens/Auth";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />

            <Stack.Screen
                name="AddProduct"
                component={AddProduct}
                options={{
                    title: "Añadir nuevo Producto",
                }}
            />
            <Stack.Screen
                name="Auth"
                component={Auth}
                options={{
                    title: "inicia sesion o registrate",
                }}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabThree"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerRight: (props) => (
                    <View>
                        <Link style={styles.auth} to={{ screen: "Auth" }}>
                            Iniciar Sesion
                        </Link>
                    </View>
                ),
            }}
        >
            {/* Buttons */}
            {/* <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Deudas',
          tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      /> */}
            <BottomTab.Screen
                name="TabTwo"
                component={Fiados}
                options={{
                    title: "Fiados",
                    tabBarIcon: ({ color }) => <TabBarIcon name="handshake-o" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="TabThree"
                component={Ventas}
                options={{
                    title: "Ventas",
                    tabBarIcon: ({ color }) => <TabBarIcon name="dollar" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="TabFour"
                component={Estadisticas}
                options={{
                    title: "Estadísticas",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={25}
                            style={{ marginBottom: -3 }}
                            name="stats-chart"
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="TabFive"
                component={Productos}
                options={{
                    title: "Productos/Stock",
                    tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    auth: {
        color: "white",
    },
});
