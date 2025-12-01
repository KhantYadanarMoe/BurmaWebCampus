// AppContent.jsx
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { useAuth } from "./contexts/AuthContext";
import { useSetting as useSiteInfoSetting } from "./Components/Admin/contexts/SiteInfoContext";

export default function AppContent() {
    const { loading: authLoading } = useAuth();
    const { loading: infoLoading } = useSiteInfoSetting();

    const isLoading = authLoading || infoLoading;

    if (isLoading) return <p>lading...</p>;

    return <RouterProvider router={routes} />;
}
