import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SettingContext = createContext();

export const SecurityProvider = ({ children }) => {
    const [securityForm, setSecurityForm] = useState({
        password_length: 8, // default
        session_timeout: 1800, // default
    });

    const [loading, setLoading] = useState(true);

    const getSetting = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const res = await axios.get("/api/settings/security", {
                withCredentials: true,
            });

            if (res.data.setting) {
                const { password_length, session_timeout } = res.data.setting;
                setSecurityForm({
                    password_length: password_length || 8,
                    session_timeout: session_timeout || 1800,
                });
            }
        } catch (err) {
            console.error("Failed to fetch setting", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSetting();
    }, []);

    return (
        <SettingContext.Provider
            value={{ securityForm, setSecurityForm, getSetting, loading }}
        >
            {children}
        </SettingContext.Provider>
    );
};

// Hook to use security settings
export const useSetting = () => useContext(SettingContext);
