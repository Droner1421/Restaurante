import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RestauranteStackNavigator } from "./RestauranteStackNavigator";
import { PlatillosDisponiblesScreen } from "../screens/PlatillosDisponiblesScreen";
import { PlatillosPorCategoriaScreen } from "../screens/PlatillosPorCategoriaScreen";
import { PedidosPorFechaScreen } from "../screens/PedidosPorFechaScreen";
import { PedidosPorMetodoPagoScreen } from "../screens/PedidosPorMetodoPagoScreen";
import { PedidosPorMesaScreen } from "../screens/PedidosPorMesaScreen";
import { PedidosPendientesScreen } from "../screens/PedidosPendientesScreen";
import { PlatillosConPedidosScreen } from "../screens/PlatillosConPedidosScreen";
import { RestauranteCRUDScreen } from "../screens/RestauranteCRUDScreen";

export type RestauranteDrawerParamList = {
  RestauranteNav: undefined;
  CrearRestaurante: undefined;
  PlatillosDisponibles: undefined;
  PlatillosPorCategoria: undefined;
  PedidosPorFecha: undefined;
  PedidosPorMetodoPago: undefined;
  PedidosPorMesa: undefined;
  PedidosPendientes: undefined;
  PlatillosConPedidos: undefined;
};

const Drawer = createDrawerNavigator<RestauranteDrawerParamList>();

export const RestauranteDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="RestauranteNav"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#667eea",
        drawerInactiveTintColor: "#999",
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
      <Drawer.Screen
        name="CrearRestaurante"
        component={RestauranteCRUDScreen}
        options={{
          title: "Crear Restaurante",
          drawerLabel: "Crear Restaurante",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
      <Drawer.Screen
        name="RestauranteNav"
        component={RestauranteStackNavigator}
        options={{
          title: "Restaurantes",
          drawerLabel: "Restaurantes",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="PlatillosDisponibles"
        component={PlatillosDisponiblesScreen}
        options={{
          title: "Platillos Disponibles",
          drawerLabel: "Platillos Disponibles",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
      <Drawer.Screen
        name="PlatillosPorCategoria"
        component={PlatillosPorCategoriaScreen}
        options={{
          title: "Platillos por Categoría",
          drawerLabel: "Platillos por Categoría",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
      <Drawer.Screen
        name="PedidosPorFecha"
        component={PedidosPorFechaScreen}
        options={{
          title: "Pedidos por Fecha",
          drawerLabel: "Pedidos por Fecha",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
      <Drawer.Screen
        name="PedidosPorMetodoPago"
        component={PedidosPorMetodoPagoScreen}
        options={{
          title: "Pedidos por Método de Pago",
          drawerLabel: "Pedidos por Método de Pago",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
      <Drawer.Screen
        name="PedidosPorMesa"
        component={PedidosPorMesaScreen}
        options={{
          title: "Pedidos por Mesa",
          drawerLabel: "Pedidos por Mesa",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
      <Drawer.Screen
        name="PedidosPendientes"
        component={PedidosPendientesScreen}
        options={{
          title: "Pedidos Pendientes",
          drawerLabel: "Pedidos Pendientes",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
      <Drawer.Screen
        name="PlatillosConPedidos"
        component={PlatillosConPedidosScreen}
        options={{
          title: "Platillos con Pedidos",
          drawerLabel: "Platillos con Pedidos",
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}></Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};