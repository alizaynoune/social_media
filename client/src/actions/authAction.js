import { SUCCESS, IS_LOADING, FAILURE, AUTH_FAIL, AUTH_SUCCESS, AUTH_USER } from './types'
import { apiLongin, apiRegister, apiforgotPassword } from '../api';

export const singIn = (request) => {
    console.log(request);
    return async (dispatch) => {
        dispatch({ type: IS_LOADING })
        try {
            const res = await apiLongin(request)
            console.log(res.data, 'res data');
            dispatch(success(res.data, AUTH_SUCCESS))
        } catch (error) {
            console.log(error?.response?.data || error);
            dispatch(fail(error?.response?.data || error, AUTH_FAIL))
        }
    }
}

export const register = (request) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING })
        try {
            const res = await apiRegister(request)
            console.log(res.data, 'res data');
            dispatch(success(res.data, SUCCESS))
        } catch (error) {
            console.log(error?.response?.data || error);
            dispatch(fail(error?.response?.data || error, FAILURE))
        }
    }
}

export const forgotPassword = (request) => {
    console.log(request, 'test');
    return async (dispatch) => {
        dispatch({ type: IS_LOADING })
        try {
            const res = await apiforgotPassword(request)
            console.log(res.data, 'res data');
            dispatch(success(res.data, SUCCESS))
        } catch (error) {
            console.log(error?.response?.data || error, 'auth error');
            dispatch(fail(error?.response?.data || error, FAILURE))
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
            } else {
                dispatch(fail({ error: 'no token' }))
            }
        } catch (error) {
            console.log(error?.response?.data || error);

        }
    }
}

const success = (data, type) => {
    localStorage.setItem('token', data.data.tokenAuth);
    return {
        type: type,
        payload: data.data
    }
}

const fail = (data, type) => {
    console.log(data, 'data');
    return {
        type: type,
        payload: data
    }
}
