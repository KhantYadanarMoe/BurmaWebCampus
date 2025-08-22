import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Blogs from "./Pages/Blogs";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/courses",
                element: <Courses />,
            },
            {
                path: "/blogs",
                element: <Blogs />,
            },
        ],
    },
]);

export default routes;
