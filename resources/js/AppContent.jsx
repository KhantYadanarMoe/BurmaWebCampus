// AppContent.jsx
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { useAuth } from "./contexts/AuthContext";
import { useSetting as useSiteInfoSetting } from "./Components/Admin/contexts/SiteInfoContext";
import Loading from "./Components/Loading";

export default function AppContent() {
    const { loading: authLoading } = useAuth();
    const { loading: infoLoading } = useSiteInfoSetting();

    const isLoading = authLoading || infoLoading;

    if (isLoading) return <Loading size={100} />;

    return <RouterProvider router={routes} />;
}
