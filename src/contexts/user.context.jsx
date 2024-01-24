//This is a version using Reducers instead of useState

import { createContext, useEffect, useContext } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                //ALWAYS return an object that
                ...state, //spreads through the previous state
                currentUser: payload // and then update the relevant values that you care about
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
   // REPLACED const [currentUser, setCurrentUser] = useState(null);

    //Destructure the state object:  const { currentUser } = state;
    //useReducer hook takes 2 args: a reducer and the initial value for the state
    const [ { currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user });
    };

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

 export const useCurrentUser = () => useContext(UserContext)