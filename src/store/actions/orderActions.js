import axios from 'axios'
import * as actionTypes from './actionTypes';

const url = 'https://mts-intern-assignment.firebaseio.com/users';

export const orderTicket = (eventData, token, userId) => {
    return dispatch => {
        dispatch(orderTicketStart());
        let ticketData = {
            [eventData.event_Id]: { 
                event: { ...eventData.event },
                organizer: { ...eventData.organizer }
            }
        }
        let queryParams = `.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        let usersKey = null;
        axios.get(url + queryParams)
            .then(response => {
                console.log(response);
                for (let key in response.data) {
                    usersKey = key;
                    for (let ticket in response.data[key].tickets) {
                        const addObject = {
                            [ticket]: { ...response.data[key].tickets[ticket] }
                        }
                        ticketData = Object.assign(ticketData, addObject)
                    }
                }
                const ticketPatch = {
                    tickets: { ...ticketData }
                }
                queryParams = `/${usersKey}.json?auth=${token}`;
                axios.patch(url + queryParams, ticketPatch)
                    .then(response => {
                        console.log(response);
                        dispatch(orderTicketSuccess());
                    })
                    .catch(err => {
                        dispatch(orderTicketFail(err.response.data.error));
                    })
            })
            .catch(err => {
                console.log(err);
            })
        
    }
}

export const orderTicketStart = () => {
    return { type: actionTypes.ORDER_TICKET_START };
};

export const orderTicketSuccess = () => {
    return { type: actionTypes.ORDER_TICKET_SUCCESS };
};

export const orderTicketFail = (error) => {
    return {
        type: actionTypes.ORDER_TICKET_FAIL,
        error: error
    };
};

export const fetchMyTickets = (token, userId) => {
    return dispatch => {
        dispatch(fetchMyTicketsStart());
        let ticketsData = {};
        const queryParams = `.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(url + queryParams)
            .then(response => {
                for (let key in response.data) {
                    for (let ticket in response.data[key].tickets) {
                        let addObject = {
                            [ticket]: {
                                events: {...response.data[key].tickets[ticket].event},
                                organizer: {...response.data[key].tickets[ticket].organizer}
                            }
                        };
                        ticketsData = Object.assign(ticketsData, addObject);
                    } 
                }
                dispatch(fetchMyTicketsSuccess(ticketsData));
            })
            .catch(err => {
                dispatch(fetchMyTicketsFail(err.response.data.error))
            })
    }
};

export const fetchMyTicketsStart = () => {
    return { type: actionTypes.FETCH_MY_TICKETS_START };
};

export const fetchMyTicketsSuccess = (ticketsData) => {
    return {
        type: actionTypes.FETCH_EVENT_SUCCESS,
        myTickets: ticketsData
    }
};

export const fetchMyTicketsFail = (error) => {
    
};