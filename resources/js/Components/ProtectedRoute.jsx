import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // or spinner

    if (!user) return <Navigate to="/login" replace />;

    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
