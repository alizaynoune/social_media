import { AUTH_FAIL, AUTH_SUCCESS, AUTH_LODING, AUTH_USER } from './types'
import { apiLongin } from '../api';

export const singIn = (request) => {
    console.log(request);
    return async (dispatch) => {
        dispatch({ type: AUTH_LODING })
        try {
            const res = await apiLongin(request)
            console.log(res.data, 'res data');
            dispatch(success(res.data))
        } catch (error) {
            console.log(error?.response?.data || error);
            dispatch(fail(error?.response?.data || error))
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_FAIL,
        payload: {}
    }
}

export const isAuth = () => {
    return dispatch => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                dispatch({
                    type: AUTH_USER,
                    payload: token
                })
            }else{
                dispatch(fail({error: 'no token'}))
            }
        } catch (error) {
            console.log(error?.response?.data || error);
            
        }
    }
}

const success = (data) => {
    localStorage.setItem('token', data.data.tokenAuth);
    return {
        type: AUTH_SUCCESS,
        payload: data.data
    }
}

const fail = (data) => {
    return {
        type: AUTH_FAIL,
        payload: data
    }
}
