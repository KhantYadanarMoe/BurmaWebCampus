import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "../css/app.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./AppContent";
import { SiteInfoProvider } from "./Components/Admin/contexts/SiteInfoContext";
import { AppearanceProvider } from "./Components/Admin/contexts/AppearanceContext";

export default function App() {
    return (
        <AuthProvider>
            <SiteInfoProvider>
                <AppearanceProvider>
                    <AppContent />
                </AppearanceProvider>
            </SiteInfoProvider>
        </AuthProvider>
    );
}

createRoot(document.getElementById("app")).render(<App />);
