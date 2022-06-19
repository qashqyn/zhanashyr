import { AUTH, UPDATE_USER, USER_EXISTS } from '../constants/actionTypes';
import * as api from '../api';

export const isExists = (email) => async (dispatch) => {
    try {
        const {data} = await api.isExists(email);

        dispatch({type: USER_EXISTS, data});
    } catch (error) {
        console.log(error);
    }
};

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const {data}  = await api.signIn(formData);

        await dispatch({type: AUTH, data});
        
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({type: AUTH, data});
        
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.updateUser(formData);
        dispatch({type: AUTH, data});
    } catch (error) {
        console.log(error);
    }
}