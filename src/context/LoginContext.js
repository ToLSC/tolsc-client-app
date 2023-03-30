import React, { createContext, useEffect, useState } from "react";
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../utils/Firebase";
import { getDatabase } from "firebase/database" 

export const AccountContext = createContext();

export const AccountProvider = ({children}) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);

    const [user, setUser] = useState(auth.currentUser);
   
    return(
        <AccountContext.Provider value={{user, setUser, auth, database}}>
            {children}
        </AccountContext.Provider>
    )

}