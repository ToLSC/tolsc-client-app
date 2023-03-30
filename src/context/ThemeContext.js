import React, { createContext, useState } from "react";
import {Appearance} from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const colorScheme = Appearance.getColorScheme();
    const theme = false;

    if(colorScheme === 'dark'){
        theme = true;
    }

    const [darkThemeEnabled, setDarkThemeEnabled] = useState(theme);

    return(
        <ThemeContext.Provider value={{darkThemeEnabled, setDarkThemeEnabled}}> 
            {children}
        </ThemeContext.Provider>
    )
} 