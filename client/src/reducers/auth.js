import { AUTH, LOGOUT, USER_EXISTS,CLEAR_USER_EXISTS, UPDATE_USER } from '../constants/actionTypes';

const authReducer = (state = {authData: null, userExists: null}, action) => {
    switch(action.type){
        case AUTH:
            if(action.data){
                localStorage.setItem('profile', JSON.stringify({...action.data}));
            }
            return { ...state, authData: action?.data, userExists: null};
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, userExists: null};
        case USER_EXISTS:
            return { ...state, userExists: action?.data };
        case UPDATE_USER:
            return {...state, update_status: action.data.staus};
        case CLEAR_USER_EXISTS: 
            return {...state, userExists: null};
        // case UPDATE_USER:
        //     localStorage.setItem('profile', JSON.stringify({...action?.data}));

        //     return { ...state, authData: action?.data};
        default:
            return  state;
    }
};

export default authReducer;