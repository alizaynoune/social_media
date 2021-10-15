import { AUTH_FAIL, AUTH_SUCCESS, AUTH_LODING } from './types'
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

const success = (data) => {
    localStorage.setItem('token', data.data.tokenAuth);
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}

const fail = (data) => {
    return {
        type: AUTH_FAIL,
        payload: data
    }
}
