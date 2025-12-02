import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SettingContext = createContext();

export const AppearanceProvider = ({ children }) => {
    const [form, setForm] = useState({
        google_font_url: "",
        google_font_family: "",
    });

    const [loading, setLoading] = useState(true);

    const getSetting = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const res = await axios.get("/api/settings/appearance", {
                withCredentials: true,
            });
            if (res.data.setting) {
                const setting = res.data.setting;
                setForm({
                    google_font_url: setting.google_font_url || "",
                    google_font_family: setting.google_font_family || "",
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
