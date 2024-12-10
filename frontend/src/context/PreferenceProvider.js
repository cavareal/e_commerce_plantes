import { createContext, useState } from 'react'

export const PreferencesContext = createContext();

export const PreferenceProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    return (
        <PreferencesContext.Provider
            value={{ darkMode, setDarkMode }}>
            {children}
        </PreferencesContext.Provider>
    )
}
