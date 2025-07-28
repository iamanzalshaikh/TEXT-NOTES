// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserDataContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Default: true

    const getCurrentUser = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/user/getCurrentUser", {
                withCredentials: true,
            });

            console.log("✅ [Frontend] Current user response:", res.data.user);
            setUserData(res.data.user);
        } catch (err) {
            console.error("❌ [Frontend] Failed to get user:", err?.response?.data || err.message);
            setUserData(null);
        } finally {
            setLoading(false);
            console.log("✅ [Frontend] Done loading user");
        }
    };

    useEffect(() => {
        console.log("⏳ [Frontend] Fetching current user...");
        getCurrentUser();
    }, []);

    return (
        <UserDataContext.Provider value={{ userData, setUserData, loading, getCurrentUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContextProvider;
