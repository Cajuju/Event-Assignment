import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    name: null,
    email: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return { ...state, loading: true, error: null}
        case actionTypes.AUTH_SUCCESS:
            return { 
                ...state,
                token: action.idToken,
                userId: action.userId,
                name: action.name,
                email: action.email,
                error: null,
                loading: false,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_SIGNOUT:
            return {
                ...state,
                token: null,
                userId: null,
                name: null,
                email: null
            }
        default:
            return state;
    }
}

export default reducer;