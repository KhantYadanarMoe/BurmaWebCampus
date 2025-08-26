import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Blogs from "./Pages/Blogs";
import Blog from "./Pages/Blog";
import About from "./Pages/About";

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
                path: "/about",
                element: <About />,
            },
            {
                path: "/courses",
                element: <Courses />,
            },
            {
                path: "/blogs",
                element: <Blogs />,
            },
            {
                path: "/blog",
                element: <Blog />,
            },
        ],
    },
]);

export default routes;
