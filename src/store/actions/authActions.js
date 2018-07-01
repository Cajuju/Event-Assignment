import axios from 'axios';
import { FIREBASE_API_KEY } from '../../constants/api_keys';
import * as actionTypes from './actionTypes';

// auth is called when the user signs in or signs up
export const auth = (name, email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`;
        if(isSignUp === false) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localStorage is build into javascript
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('name', name)
                localStorage.setItem('email', email)
                
                if (isSignUp) {
                    dispatch(authSuccess(response.data.idToken, response.data.localId, name, email, isSignUp));
                } else {
                    dispatch(fetchUser(response.data.idToken, response.data.localId))
                }
                
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                // console.log(err);
                dispatch(authFail(err.response.data.error))
            })
    }
}

// fetchUser is used get the user's name and email from the database
// Used when user is not in signup mode and when user refreshes the application
export const fetchUser = (token, userId) => {
    return dispatch => {
        let url = 'https://mts-intern-assignment.firebaseio.com/users.json';
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        let userData = null;
        axios.get(url + queryParams)
            .then(response => {
                for (let key in response.data) {
                    userData = {
                        email: response.data[key].email,
                        name: response.data[key].name,
                    }
                }
                localStorage.setItem('name', userData.name)
                localStorage.setItem('email', userData.email)
                dispatch(authSuccess(token, userId, userData.name, userData.email))
            });
    }
}

// auth Starts will signal the app to load
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

// When auth is a success it will return the user's data
export const authSuccess = (token, userId, name, email, isSignUp) => {
    // if user is signing up, it will post the user's data to database
    let url = 'https://mts-intern-assignment.firebaseio.com/users.json';
    const queryParams = `?auth=${token}`
    if (isSignUp) {
        const newUserData = {
            name: name,
            email: email,
            userId: userId
        }
        axios.post(url + queryParams, newUserData)
            .then(response => {
                console.log(response)
            });
    } 
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        name: name,
        email: email
    }
}

// When auth fails it will return an error
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// When the user signs out it will remove items from the local storage
export const signout = () => {
    // Both are not needed anymore when the user logs out
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    return dispatch => {
        dispatch({ type: actionTypes.AUTH_SIGNOUT })
        dispatch({ type: actionTypes.RESET_EVENT_REDUCERS })
        dispatch({ type: actionTypes.RESET_ORDER_REDUCERS })
    }
}

// checkAuthTimeout checks if the token has expired
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(signout());
        }, expirationTime * 1000);
    }
}

// authCheckState will check the local storage to see if the user has logged in previously
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            signout();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(signout());
            } else {
                // We need to get the user's data to pass into authSuccess
                // Our options were to do a post request or store localally in the storage
                const userId = localStorage.getItem('userId');
                const name = localStorage.getItem('name');
                const email = localStorage.getItem('email');
                dispatch(authSuccess(token, userId, name, email));
                // We pass in the future date minus the current date in miliseconds
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};