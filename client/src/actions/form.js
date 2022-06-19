import * as api from '../api';
import { QUESTION, REQUEST } from '../constants/actionTypes';

export const sendQuestion = (formData) => async (dispatch) => {
    try {
        const data = await api.sendQuestion(formData);

        dispatch({type: QUESTION, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const sendRequest = (formData) => async (dispatch) => {
    try {
        const data = await api.sendRequest(formData);

        dispatch({type: REQUEST, payload:data});
    } catch (error) {
        console.log(error);
    }
};
