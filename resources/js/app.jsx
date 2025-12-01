import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "../css/app.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./AppContent";
import { SiteInfoProvider } from "./Components/Admin/contexts/SiteInfoContext";

export default function App() {
    return (
        <AuthProvider>
            <SiteInfoProvider>
                <AppContent />
            </SiteInfoProvider>
        </AuthProvider>
    );
}

createRoot(document.getElementById("app")).render(<App />);
