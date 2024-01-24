//This is a version using useState instead of Reducers

import { createContext, useState, useEffect, useContext } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {

// Here, you're using React's useState hook. This line of code does the following:
// currentUser: This is a variable that holds the current state value. 
// In this case, it's initialized with null.
// setCurrentUser: This is a function that allows you to update the currentUser state. 
// When you call setCurrentUser(newValue), it will update currentUser to newValue. 
    const [currentUser, setCurrentUser] = useState(null);
    
// Here, you're creating an object called value. This object contains two properties:
// currentUser: This property holds the current state value (null initially).
// setCurrentUser: This property holds the function that allows you to update the currentUser state.
// The purpose of creating this object is likely to pass it as the value prop to a React context provider.
// This way, you can make the currentUser state and the setCurrentUser function available to any child components that consume this context.
    const value = { currentUser, setCurrentUser };

    //Only running the below function once, when the component mounts. 
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []); //it has an empty dependency array

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

 export const useCurrentUser = () => useContext(UserContext)