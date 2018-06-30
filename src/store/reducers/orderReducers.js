import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderedTickets: null,
    loading: false,
    error: null
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_TICKET_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.ORDER_TICKET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case actionTypes.ORDER_TICKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case actionTypes.FETCH_MY_TICKETS_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.FETCH_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orderedTickets: action.myTickets,
            }
        case actionTypes.FETCH_EVENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.RESET_ORDER_REDUCERS:
            return {
                ...state,
                orderedTickets: null
            }
        default:
            return state;
    }
}

export default reducer;