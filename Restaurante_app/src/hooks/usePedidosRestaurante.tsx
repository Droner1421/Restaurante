import { useReducer } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Pedido } from "../interfaces/restauranteInterface";

export interface PedidosFormData {
    pedidos:    Pedido[];
    isLoading:  boolean;
}

interface UsePedidosRestaurante {
    state:              PedidosFormData;
    handleLoad:         (restauranteId: number) => void;
    handleCreate:       (pedido: Omit<Pedido, 'id'>) => Promise<any>;
    handleUpdate:       (id: number, pedido: Partial<Pedido>) => Promise<any>;
    handleDelete:       (id: number) => Promise<any>;
}

export const usePedidosRestaurante = (restauranteId: number): UsePedidosRestaurante => {

    const initialForm: PedidosFormData = {
        pedidos:    [],
        isLoading:  false,
    }

    type Action = 
        | { type: "setPedidos"; payload: Pedido[] }
        | { type: "setLoading"; payload: boolean }
        | { type: "addPedido"; payload: Pedido }
        | { type: "updatePedido"; payload: { id: number; pedido: Partial<Pedido> } }
        | { type: "deletePedido"; payload: number };

    const pedidosReducer = ( state: PedidosFormData, action: Action ): PedidosFormData => {
        switch( action.type ){
            case "setPedidos":
                return {
                    ...state,
                    [ "pedidos" ]: action.payload
                }
            case "setLoading":
                return {
                    ...state,
                    [ "isLoading" ]: action.payload
                }
            case "addPedido":
                return {
                    ...state,
                    pedidos: [ ...state.pedidos, action.payload ]
                }
            case "updatePedido":
                return {
                    ...state,
                    pedidos: state.pedidos.map( p => 
                        p.id === action.payload.id || (p as any).id_pedido === action.payload.id
                            ? { ...p, ...action.payload.pedido }
                            : p
                    )
                }
            case "deletePedido":
                return {
                    ...state,
                    pedidos: state.pedidos.filter( p => p.id !== action.payload && (p as any).id_pedido !== action.payload )
                }
            default:
                return state;
        }
    }

    const [ state, dispatch ] = useReducer( pedidosReducer, initialForm );

    const handleLoad = async ( restauranteId: number ) => {
        dispatch({ type: "setLoading", payload: true });
        const resp = await restauranteApi.get(`/restaurante-pedidos/pedidos-por-restaurante?restauranteId=${restauranteId}`);
        const data = Array.isArray(resp.data.data) ? resp.data.data : [];
        dispatch({ type: "setPedidos", payload: data });
        dispatch({ type: "setLoading", payload: false });
    };

    const handleCreate = async ( pedido: Omit<Pedido, 'id'> ) => {
        const resp = await restauranteApi.post("/restaurante-pedidos/pedidos", pedido);
        const pedidoData = resp.data.data || resp.data;
        if( pedidoData ){
            dispatch({ type: "addPedido", payload: pedidoData });
        }
        return resp.data;
    };

    const handleUpdate = async ( id: number, pedido: Partial<Pedido> ) => {
        const resp = await restauranteApi.patch(`/restaurante-pedidos/pedidos/${id}`, pedido);
        dispatch({ type: "updatePedido", payload: { id, pedido } });
        return resp.data;
    };

    const handleDelete = async ( id: number ) => {
        const resp = await restauranteApi.delete(`/restaurante-pedidos/pedidos/${id}`);
        dispatch({ type: "deletePedido", payload: id });
        return resp.data;
    };

    return { state, handleLoad, handleCreate, handleUpdate, handleDelete };
};
