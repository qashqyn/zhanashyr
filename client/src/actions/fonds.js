import { CREATE_FOND, END_LOADING, FETCH_ALL_FONDS, FETCH_ONE_FOND, START_LOADING, UPDATE_FOND } from "../constants/actionTypes";
import * as api from '../api';
import { getEventsByFondId } from "./events";

export const getFonds = () => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchFonds();

        dispatch({type: FETCH_ALL_FONDS, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const searchFonds = (search, location, category) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.searchFonds(search, location, category);

        dispatch({type: FETCH_ALL_FONDS, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createFond = (fond) => async (dispatch) => {
    try {
        const data = await api.createFond(fond);

        dispatch({type: CREATE_FOND, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const updateFond = (fond) => async (dispatch) => {
    try {
        const data = await api.updateFond(fond);

        dispatch({type: UPDATE_FOND, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getFondById = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchFondById(id);
        dispatch(getEventsByFondId(id));

        dispatch({type: FETCH_ONE_FOND, payload: data});
        dispatch({type: END_LOADING}); 
    } catch (error) {
        console.log(error);
    }
}