import axios from 'axios';
import * as actionTypes from './actionTypes';

const url = 'https://mts-intern-assignment.firebaseio.com/events.json';
// const storageUrl = 'mts-intern-assignment.appspot.com/eventImages'
export const createEvent = (organizerData, eventData) => {
    return dispatch => {
        console.log(`${eventData.name}_${organizerData.userId}`);
        dispatch(createEventStart());
        const compiledData = {
            organizer: { ...organizerData, token: null },
            event: { ...eventData },
            event_Id: `${eventData.name}_${organizerData.userId}`
        }
        axios.post(url + `?auth=${organizerData.token}`, compiledData)
            .then(response => {
                dispatch(createEventSuccess(compiledData));
                dispatch(fetchMyEvents(organizerData.userId));
            })
            .catch(err => {
                dispatch(createEventFail(err.response.data.error))
            })
    }
}

export const createEventStart = () => {
    return { type: actionTypes.CREATE_EVENT_START };
}

export const createEventSuccess = (compiledData) => {
    return { 
        type: actionTypes.CREATE_EVENT_SUCCESS,
        eventsData: compiledData
    };
}

export const createEventFail = (error) => {
    return {
        type: actionTypes.CREATE_EVENT_FAIL,
        error: error
    };
}

export const fetchMyEvents = (userId) => {
    return dispatch => {
        const myEventsData = [];
        const queryParams = `?orderBy="organizer/userId"&equalTo="${userId}"`;
        axios.get(url + queryParams)
            .then(response => {
                for (let key in response.data) {
                    myEventsData.push(response.data[key]);
                }
                dispatch(fetchMyEventsSuccess(myEventsData))
            })
            .catch(err => {
                console.log(err);
            })
    };
}

export const fetchMyEventsSuccess = (myEventsData) => {
    return {
        type: actionTypes.FETCH_MY_EVENTS_SUCCESS,
        myEventsData: myEventsData,
    }
}

export const fetchEvents = () => {
    return dispatch => {
        dispatch(fetchEventsStart());

        const eventsData = [];
        axios.get(url)
            .then(response => {
                for (let key in response.data) {
                    eventsData.push(response.data[key]);
                }
                dispatch(fetchEventsSuccess(eventsData));
            })
            .catch(err => {
                dispatch(fetchEventsFail(err));
            })
    }
}

export const fetchEventsStart = () => {
    return { type: actionTypes.FETCH_EVENTS_START }
}

export const fetchEventsSuccess = (eventsData) => {
    return {
        type: actionTypes.FETCH_EVENTS_SUCCESS,
        eventsData: eventsData,
    }
}

export const fetchEventsFail = (err) => {
    return {
        type: actionTypes.FETCH_EVENTS_FAIL,
        error: err,
    }
}

export const fetchEvent = (eventName, userId) => {
    return dispatch => {
        let selectedEvent = null;
        const queryParams = `?orderBy="event_Id"&equalTo="${eventName}_${userId}"`;
        axios.get(url + queryParams)
            .then(response => {
                for (let key in response.data) {
                    selectedEvent = response.data[key];
                }
                dispatch(fetchEventSuccess(selectedEvent));
            })
            .catch(err => {
                dispatch(fetchEventFail(err))
            })
    };
}

export const fetchEventStart = () => {
    return { type: actionTypes.FETCH_EVENT_START }
}

export const fetchEventSuccess = (selectedEvent) => {
    return {
        type: actionTypes.FETCH_EVENT_SUCCESS,
        selectedEvent: selectedEvent
    }
}

export const fetchEventFail = (error) => {
    return { 
        type: actionTypes.FETCH_EVENT_FAIL,
        error: error
     }
}