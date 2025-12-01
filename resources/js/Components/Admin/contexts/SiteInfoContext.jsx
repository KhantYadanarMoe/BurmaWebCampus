import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SettingContext = createContext();

export const SiteInfoProvider = ({ children }) => {
    const [form, setForm] = useState({
        site_name: "",
        header: "",
        description: "",
        logo: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSetting = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const res = await axios.get("/api/settings/info", {
                withCredentials: true,
            });
            if (res.data.setting) {
                const setting = res.data.setting;
                setForm({
                    site_name: setting.site_name || "",
                    header: setting.header || "",
                    description: setting.description || "",
                    logo: setting.logo || "",
                });

                if (setting.logo) {
                    setImage(setting.logo); // optional, for preview
                }
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
            value={{ form, setForm, image, setImage, getSetting, loading }}
        >
            {children}
        </SettingContext.Provider>
    );
};

// Custom hook to use the setting context easily
export const useSetting = () => useContext(SettingContext);
