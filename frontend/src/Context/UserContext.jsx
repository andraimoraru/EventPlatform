import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUserData = localStorage.getItem("user");
        return savedUserData ? JSON.parse(savedUserData) : {}; 
    });

    const saveUser = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData)); 
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser({});
    };

    return (
        <UserContext.Provider value={{ user, saveUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};