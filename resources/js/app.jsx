import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "../css/app.css";

export default function App() {
    return <RouterProvider router={routes} />;
}

createRoot(document.getElementById("app")).render(<App />);
