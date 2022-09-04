import {createContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import {isValidToken, setSession} from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
    isAuthenticated: false, isInitialized: false, user: null,
};

const handlers = {
    INITIALIZE: (state, action) => {
        const {isAuthenticated, user} = action.payload;
        return {
            ...state, isAuthenticated, isInitialized: true, user,
        };
    }, LOGIN: (state, action) => {
        const {user} = action.payload;

        return {
            ...state, isAuthenticated: true, user,
        };
    }, LOGOUT: (state) => ({
        ...state, isAuthenticated: false, user: null,
    }), REGISTER: (state, action) => {
        const {user} = action.payload;

        return {
            ...state, isAuthenticated: true, user,
        };
    },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);

                    const response = await axios.get('/api/account/my-account');
                    const {user} = response.data;

                    dispatch({
                        type: 'INITIALIZE', payload: {
                            isAuthenticated: true, user,
                        },
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE', payload: {
                            isAuthenticated: false, user: null,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE', payload: {
                        isAuthenticated: false, user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (moodleId, password) => {
        const response = await axios.post('/find-user', {
            moodleId: moodleId, password: password,
        });

        if (response.status === 200) {
            console.log(response)
            const {accessToken, user} = response.data;


            setSession(accessToken);
            dispatch({
                type: 'LOGIN', payload: {
                    user,
                },
            });
        } else {
            throw new Error("Cannot find user. Please enter valid credentials.")
        }

    };

    const register = async (firstName, lastName, year, branch, div, rollNumber, moodleId, email, password) => {
        const response = await axios.post('/add-user', {
            firstName: firstName,
            lastName: lastName,
            year: year,
            branch: branch,
            div: div,
            roll: rollNumber,
            moodleId: moodleId,
            email: email,
            password: password
        });
        console.log(response)
        const {accessToken, user} = response.data;

        window.localStorage.setItem('accessToken', accessToken);
        dispatch({
            type: 'REGISTER', payload: {
                user,
            },
        });
    };

    const logout = async () => {
        setSession(null);
        dispatch({type: 'LOGOUT'});
    };

    return (<AuthContext.Provider
        value={{
            ...state, method: 'jwt', login, logout, register,
        }}
    >
        {children}
    </AuthContext.Provider>);
}

export {AuthContext, AuthProvider};