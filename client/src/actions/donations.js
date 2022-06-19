import * as api from '../api';
import { DONATE, FETCH_DONATIONS } from '../constants/actionTypes';

export const getDonationsByFondId = (fondId) => async(dispatch) =>{
    try {
        const data = await api.fetchDonationsByFondId(fondId);

        dispatch({type: FETCH_DONATIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getDonationsByEventId = (eventId) => async(dispatch) =>{
    try {
        const data = await api.fetchDonationsByEventId(eventId);

        dispatch({type: FETCH_DONATIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getDonationsByUserId = (userId) => async(dispatch) =>{
    try {
        const data = await api.fetchDonationsByUserId(userId);

        dispatch({type: FETCH_DONATIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}



export const donate = (donation, fondId, eventId, userId) => async (dispatch)=>{
    try {
        const data = await api.donate(donation, fondId, eventId, userId);

        dispatch({type: DONATE, payload: data});
    } catch (error) {
        console.log(error); 
    }
}