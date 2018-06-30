import * as actionTypes from '../actions/actionTypes';

const initialState = {
    myRecentEvent: null,
    myEvents: null,
    eventsList: null,
    loading: false,
    error: null,
    selectedEvent: null
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_EVENT_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.CREATE_EVENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null ,
                myRecentEvent: action.eventsData
            };
        case actionTypes.CREATE_EVENT_FAIL:
            return { ...state, loading: false, error: action.error };
        case actionTypes.FETCH_MY_EVENTS_SUCCESS:
            return { ...state, myEvents: action.myEventsData }
        case actionTypes.FETCH_EVENTS_START:
            return { ...state, loading: true }
        case actionTypes.FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                eventsList: action.eventsData,
            }
        case actionTypes.FETCH_EVENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case actionTypes.FETCH_EVENT_START: 
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
                selectedEvent: action.selectedEvent
            }
        case actionTypes.FETCH_EVENT_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case actionTypes.RESET_EVENT_REDUCERS: 
            return {
                ...state,
                eventsList: null
            }
        default:
            return state;
    }
};

export default reducer;