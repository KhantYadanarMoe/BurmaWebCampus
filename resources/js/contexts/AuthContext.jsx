import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get("/api/user", { withCredentials: true });
            setUser(res.data);
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser().finally(() => setLoading(false));
    }, []);

    // 👇 Add refreshUser function
    const refreshUser = async () => {
        await fetchUser();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
