// src/context/AuthContext.js
import React, { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const serverUrl = "https://text-notes-backend.onrender.com";

    return (
        <AuthContext.Provider value={{ serverUrl }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
