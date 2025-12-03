import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SettingContext = createContext();

export const SecurityProvider = ({ children }) => {
    const [form, setForm] = useState({
        password_length: "",
        session_timeout: "",
    });

    const [loading, setLoading] = useState(true);

    const getSetting = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const res = await axios.get("/api/settings/security", {
                withCredentials: true,
            });
            if (res.data.setting) {
                const setting = res.data.setting;
                setForm({
                    password_length: setting.password_length || "",
                    session_timeout: setting.session_timeout || "",
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
        <SettingContext.Provider value={{ form, setForm, getSetting, loading }}>
            {children}
        </SettingContext.Provider>
    );
};

// Custom hook to use the setting context easily
export const useSetting = () => useContext(SettingContext);
