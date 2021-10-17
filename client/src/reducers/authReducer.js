import { AUTH_LODING, AUTH_SUCCESS, AUTH_FAIL, AUTH_USER } from '../actions/types';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    error: null,
    loading: false,
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LODING:
            return { ...state, loading: true, error: null };
        case AUTH_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload, loading: false, error: null };
        case AUTH_FAIL:
            return { ...state, error: action.payload, loading: false };
        case AUTH_USER:
            return { ...state, token: action.payload };
        default:
            return state
    }
}