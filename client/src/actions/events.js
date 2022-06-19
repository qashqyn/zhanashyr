import * as api from '../api';
import { CREATE_EVENT, END_LOADING, FETCH_ALL_EVENTS, FETCH_ONE_EVENT, START_LOADING } from '../constants/actionTypes';

export const getEvents = () => async(dispatch) =>{
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchEvents();

        dispatch({type: FETCH_ALL_EVENTS, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getEventById = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchEventById(id);

        dispatch({type: FETCH_ONE_EVENT, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getEventsByFondId = (fondId) => async(dispatch) => {
    try {
        // dispatch({type: START_LOADING});
        const data = await api.fetchEventsByFondId(fondId);

        dispatch({type: FETCH_ALL_EVENTS, payload: data});
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getEventsByUserId = (userId) => async(dispatch) => {
    try {
        // dispatch({type: START_LOADING});
        const data = await api.fetchEventsByUserId(userId);

        dispatch({type: FETCH_ALL_EVENTS, payload: data});
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}


export const createEvent = (event, fondId, userId) => async (dispatch)=>{
    try {
        const data = await api.createEvent(event, fondId, userId);

        dispatch({type: CREATE_EVENT, payload: data});
    } catch (error) {
        console.log(error); 
    }
}