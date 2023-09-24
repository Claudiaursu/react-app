import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { basicAuth } from "../utils/firebase";


export const useAuthentication = () => {
    const [user, setUser] = useState<User>();

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(basicAuth, (_user) =>{
            if(_user){
                setUser(_user);
            } else {
                setUser(undefined);
            }
        });
        return unsubscribe;
    }, []);

    return {user};
}