import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { RestaurantesListScreen } from "../screens/RestaurantesListScreen";
import { RestauranteCRUDScreen } from "../screens/RestauranteCRUDScreen";
import { RestauranteDetailScreen } from "../screens/RestauranteDetailScreen";
import { AgregarPlatilloScreen } from "../screens/AgregarPlatilloScreen";
import { AgregarPedidoScreen } from "../screens/AgregarPedidoScreen";

export type RestauranteStackParamList = {
  RestaurantesList: undefined;
  RestauranteCRUD: { restaurante?: any } | undefined;
  RestauranteDetail: { restaurante?: any } | undefined;
  AgregarPlatillo: { restauranteId: number };
  AgregarPedido: { restauranteId: number };
};

const Stack = createStackNavigator<RestauranteStackParamList>();

export const RestauranteStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: "#667eea",
        headerStyle: {
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#333",
        },
      }}
    >
      <Stack.Screen
        name="RestaurantesList"
        component={RestaurantesListScreen}
        options={({ navigation }: any) => ({
          title: "Restaurantes",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Text style={{ fontSize: 28, color: "#667eea" }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="RestauranteCRUD"
        component={RestauranteCRUDScreen}
        options={{ title: "Crear Restaurante" }}
      />
      <Stack.Screen
        name="RestauranteDetail"
        component={RestauranteDetailScreen}
        options={{ title: "Detalle del Restaurante" }}
      />
      <Stack.Screen
        name="AgregarPlatillo"
        component={AgregarPlatilloScreen}
        options={{ title: "Agregar Platillo" }}
      />
      <Stack.Screen
        name="AgregarPedido"
        component={AgregarPedidoScreen}
        options={{ title: "Agregar Pedido" }}
      />
    </Stack.Navigator>
  );
};
