import React, { createContext, useState } from "react";
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    //Variables getColorScheme init
    const colorScheme = Appearance.getColorScheme();
    let theme = false;

    //Validation of color schema
    if (colorScheme === 'dark') theme = true;

    //Variables - state
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(theme);

    //Change theme schema
    const changeThemeContext = () => {
        setDarkThemeEnabled(false);
    }

    return (
        <ThemeContext.Provider value={{ darkThemeEnabled, setDarkThemeEnabled, changeThemeContext }}>
            {children}
        </ThemeContext.Provider>
    )
} 