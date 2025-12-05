import { useReducer } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Platillo } from "../interfaces/restauranteInterface";

export interface PlatillosFormData {
    platillos:  Platillo[];
    isLoading:  boolean;
}

interface UsePlatillosRestaurante {
    state:              PlatillosFormData;
    handleLoad:         (restauranteId: number) => void;
    handleCreate:       (platillo: Omit<Platillo, 'id'>) => Promise<any>;
    handleUpdate:       (id: number, platillo: Partial<Platillo>) => Promise<any>;
    handleDelete:       (id: number) => Promise<any>;
}

export const usePlatillosRestaurante = (restauranteId: number): UsePlatillosRestaurante => {

    const initialForm: PlatillosFormData = {
        platillos:  [],
        isLoading:  false,
    }

    type Action = 
        | { type: "setPlatillos"; payload: Platillo[] }
        | { type: "setLoading"; payload: boolean }
        | { type: "addPlatillo"; payload: Platillo }
        | { type: "updatePlatillo"; payload: { id: number; platillo: Partial<Platillo> } }
        | { type: "deletePlatillo"; payload: number };

    const platillosReducer = ( state: PlatillosFormData, action: Action ): PlatillosFormData => {
        switch( action.type ){
            case "setPlatillos":
                return {
                    ...state,
                    [ "platillos" ]: action.payload
                }
            case "setLoading":
                return {
                    ...state,
                    [ "isLoading" ]: action.payload
                }
            case "addPlatillo":
                return {
                    ...state,
                    platillos: [ ...state.platillos, action.payload ]
                }
            case "updatePlatillo":
                return {
                    ...state,
                    platillos: state.platillos.map( p => 
                        p.id === action.payload.id || (p as any).id_platillo === action.payload.id
                            ? { ...p, ...action.payload.platillo }
                            : p
                    )
                }
            case "deletePlatillo":
                return {
                    ...state,
                    platillos: state.platillos.filter( p => p.id !== action.payload && (p as any).id_platillo !== action.payload )
                }
            default:
                return state;
        }
    }

    const [ state, dispatch ] = useReducer( platillosReducer, initialForm );

    const handleLoad = async ( restauranteId: number ) => {
        dispatch({ type: "setLoading", payload: true });
        const resp = await restauranteApi.get(`/restaurante-pedidos/platillos-por-restaurante?restauranteId=${restauranteId}`);
        const data = Array.isArray(resp.data.data) ? resp.data.data : [];
        dispatch({ type: "setPlatillos", payload: data });
        dispatch({ type: "setLoading", payload: false });
    };

    const handleCreate = async ( platillo: Omit<Platillo, 'id'> ) => {
        const resp = await restauranteApi.post("/restaurante-pedidos/platillos", platillo);
        const platilloData = resp.data.data || resp.data;
        if( platilloData ){
            dispatch({ type: "addPlatillo", payload: platilloData });
        }
        return resp.data;
    };

    const handleUpdate = async ( id: number, platillo: Partial<Platillo> ) => {
        const resp = await restauranteApi.patch(`/restaurante-pedidos/platillos/${id}`, platillo);
        dispatch({ type: "updatePlatillo", payload: { id, platillo } });
        return resp.data;
    };

    const handleDelete = async ( id: number ) => {
        const resp = await restauranteApi.delete(`/restaurante-pedidos/platillos/${id}`);
        dispatch({ type: "deletePlatillo", payload: id });
        return resp.data;
    };

    return { state, handleLoad, handleCreate, handleUpdate, handleDelete };
};
