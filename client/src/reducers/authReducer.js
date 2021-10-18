import { SUCCESS, IS_LOADING, FAILURE, AUTH_FAIL, AUTH_SUCCESS, AUTH_USER  } from '../actions/types';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    error: null,
    success: false,
    loading: false,
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUCCESS:
            return { ...state, success: true, loading: false };
        case FAILURE:
            return { ...state, error: action.payload, loading: false, success: false };
        case IS_LOADING:
            return { ...state, loading: true, error: null, success: false };
        case AUTH_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload, loading: false, error: null, success: true };
        case AUTH_FAIL:
            return { ...state, error: action.payload, loading: false, success: false };
        case AUTH_USER:
            return { ...state, token: action.payload };
        
        default:
            return state
    }
}