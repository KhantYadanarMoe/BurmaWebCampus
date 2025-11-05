import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "../css/app.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./AppContent";

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

createRoot(document.getElementById("app")).render(<App />);
