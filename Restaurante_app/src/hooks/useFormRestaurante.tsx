import { useReducer } from "react";
import { restauranteApi } from "../api/restauranteApi";

export interface FormRestauranteData {
    id:         number;
    nombre:     string;
    direccion:  string;
    telefono:   string;
    horario:    string;
    capacidad:  number;
    gerente:    string;
    update:     string;
}

interface UseFormRestaurante {
    state:              FormRestauranteData;
    handleInputChange:  ( fieldName: keyof FormRestauranteData, value: string | number ) => void;
    handleSubmit:       () => void;
    handleDelete:       () => void;
    loadRestaurante:    ( restaurante: any ) => void;
}

export const useFormRestaurante = (): UseFormRestaurante => {
    
    const initialForm: FormRestauranteData = {
        id:         0,
        nombre:     "",
        direccion:  "",
        telefono:   "",
        horario:    "",
        capacidad:  0,
        gerente:    "",
        update:     "",
    }

    type Action = 
        | { type: "handleInputChange", payload: { fieldName: keyof FormRestauranteData, value: string | number } }
        | { type: "loadRestaurante", payload: FormRestauranteData };

    const formReducer = ( state: FormRestauranteData, action: Action ) => {
        switch( action.type ){
            case "handleInputChange":
                return {
                    ...state,
                    [ action.payload.fieldName ]: action.payload.value
                }
            case "loadRestaurante":
                return action.payload;
            default:
                return state;
        }
    }

    const [ state, dispatch ] = useReducer( formReducer, initialForm );

    const handleInputChange = ( fieldName: keyof FormRestauranteData, value: string | number ) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const loadRestaurante = ( restaurante: any ) => {
        const restauranteId = restaurante.id || restaurante.id_restaurante || 0;
        dispatch({ 
            type: "loadRestaurante", 
            payload: {
                id: restauranteId,
                nombre: restaurante.nombre || "",
                direccion: restaurante.direccion || "",
                telefono: restaurante.telefono || "",
                horario: restaurante.horario || "",
                capacidad: restaurante.capacidad || 0,
                gerente: restaurante.gerente || "",
                update: "",
            }
        });
    }

    const createRestaurante = async (data: FormRestauranteData) => {
        const resp = await restauranteApi.post("/restaurante-pedidos/restaurantes", {
            nombre: data.nombre,
            direccion: data.direccion,
            telefono: data.telefono,
            horario: data.horario,
            capacidad: data.capacidad,
            gerente: data.gerente,
        });
        return resp.data;
    }

    const updateRestaurante = async (data: FormRestauranteData) => {
        const resp = await restauranteApi.patch(`/restaurante-pedidos/restaurantes/${data.id}`, {
            nombre: data.nombre,
            direccion: data.direccion,
            telefono: data.telefono,
            horario: data.horario,
            capacidad: data.capacidad,
            gerente: data.gerente,
        });
        return resp.data;
    }

    const deleteRestaurante = async (data: FormRestauranteData) => {
        const resp = await restauranteApi.delete(`/restaurante-pedidos/restaurantes/${data.id}`, {
            data: {}
        });
        return resp.data;
    }

    const handleSubmit = () => ( state.id === 0 ) ? createRestaurante(state) : updateRestaurante(state);

    const handleDelete = () => deleteRestaurante(state);

    return { state, handleInputChange, handleSubmit, handleDelete, loadRestaurante };

}
