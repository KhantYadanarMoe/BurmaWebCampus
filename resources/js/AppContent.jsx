// AppContent.jsx
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { useAuth } from "./contexts/AuthContext";

export default function AppContent() {
    const { loading: authLoading } = useAuth();

    // const isLoading =
    //     authLoading ||
    //     generalLoading ||
    //     reservationLoading ||
    //     orderLoading ||
    //     heroLoading;

    // if (isLoading) return <Loading />;

    return <RouterProvider router={routes} />;
}
