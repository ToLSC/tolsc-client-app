import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../utils/Firebase";
import { getDatabase } from "firebase/database";
import { ref, get, push, remove } from "firebase/database";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {

    //Firebase path
    const FB_USERS_PATH = "users/";
    const FB_HISTORY_PATH = "history/";
    const FB_FAVORITES_PATH = "favorites/";

    // Variables init firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);

    // Variables - state
    const [user, setUser] = useState(undefined);
    const [loginStatus, setLoginStatus] = useState(false)
    const [history, setHistorial] = useState(undefined);
    const [favorites, setFavoritos] = useState(undefined);
    const [themePropery, setThemeProperty] = useState(false);

    //Hook update info onChange user
    useEffect(() => { auth.onAuthStateChanged(user => { if (user) setUser(user) }) }, [loginStatus])

    //Hook - Get data from firebase onChange user
    useEffect(() => {
        if (user) {
            getHistoryData();
            getFavoriteData();
        }
    }, [user]);

    //Read history
    const getHistoryData = async () => {
        if (user) {
            get(ref(database, FB_USERS_PATH + user.uid + "/" + FB_HISTORY_PATH)).then(data => {
                const array = [];
                data.forEach((value) => { array.push(value) });
                if (array.length !== 0) setHistorial(array);
                else setHistorial(undefined);
            }).catch(error => { console.log(error) })
        }
        else {
            setHistorial(undefined);
        }
    }

    //Read favorites
    const getFavoriteData = async () => {
        if (user) {
            get(ref(database, FB_USERS_PATH + user.uid + "/" + FB_FAVORITES_PATH)).then(data => {
                const array = [];
                data.forEach((value) => { array.push(value) });
                if (array.length !== 0) setFavoritos(array);
                else setFavoritos(undefined);
            }).catch(error => { console.log(error) })
        }

        else setFavoritos(undefined);
    }

    //Add video to history - handler
    const addHistoryHandler = async (stringToSave) => {
        var bool = false;
        await getHistoryData();
        if (history) {
            history.some(value => {
                if (value.child("string").val() === stringToSave) {
                    bool = true;
                    return value.child("string").val() === stringToSave
                }
            })

            if (!bool) {
                if (history.length >= 20) remove(ref(database, FB_USERS_PATH + user.uid + "/" + FB_HISTORY_PATH + "/" + history.at(0).key)).then().catch(error => { console.log(error) });
                push(ref(database, FB_USERS_PATH + user.uid + "/" + FB_HISTORY_PATH), { string: stringToSave }).then(() => {
                    getFavoriteData();
                    getHistoryData();
                }).catch(error => { console.log(error) });
            }
        }

        else {
            push(ref(database, FB_USERS_PATH + user.uid + "/" + FB_HISTORY_PATH), { string: stringToSave }).then(() => {
                getFavoriteData();
                getHistoryData();
            }).catch(error => { console.log(error) });
        }
    }

    //Add video to favorite - handler
    const addFavoriteHandler = (stringToSave) => {
        var bool = false;

        if (favorites) {
            favorites.some(value => {
                if (value.child("string").val() === stringToSave) {
                    bool = true;
                    return value.child("string").val() === stringToSave;
                }
            })

            if (!bool) {
                if (favorites.length >= 30) remove(ref(database, FB_USERS_PATH + user.uid + "/" + FB_FAVORITES_PATH + "/" + favorites.at(0).key)).then().catch(error => { console.log(error) });
                push(ref(database, FB_USERS_PATH + user.uid + "/" + FB_FAVORITES_PATH), { string: stringToSave }).then(() => {
                    getFavoriteData();
                    getHistoryData();
                }).catch(error => { console.log(error) })
            }
        }

        else {
            push(ref(database, FB_USERS_PATH + user.uid + "/" + FB_FAVORITES_PATH), { string: stringToSave }).then(() => {
                getFavoriteData();
                getHistoryData();
            }).catch(error => { console.log(error) })
        }
    }

    //Dalete video from favorites - handler
    const deleteFavoriteHandler = (stringToDelete) => {
        if (favorites) {
            favorites.some(value => {
                if (value.child("string").val() === stringToDelete) {
                    remove(ref(database, FB_USERS_PATH + user.uid + "/" + FB_FAVORITES_PATH + "/" + value.key)).then(() => {
                        getFavoriteData();
                        getHistoryData();
                    }).catch(error => { console.log(error) });
                    return value.child("string").val() === stringToDelete;
                }
            })
        }
    }

    return (
        <AccountContext.Provider value={{ user, themePropery, setUser, auth, database, setLoginStatus, history, favorites, addHistoryHandler, addFavoriteHandler, deleteFavoriteHandler, getHistoryData, getFavoriteData }}>
            {children}
        </AccountContext.Provider>
    )
}