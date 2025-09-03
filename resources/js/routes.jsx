import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Blogs from "./Pages/Blogs";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import Checkout from "./Pages/Checkout";
import CourseOverview from "./Pages/CourseOverview";
import CourseDetails from "./Pages/CourseDetails";
import Profile from "./Pages/Profile";
import UserLayout from "./Layouts/UserLayout";

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
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/course", //it should be course name
                element: <CourseOverview />,
            },
            {
                path: "/details", //it should be course name with user (John/frontendDev)
                element: <CourseDetails />,
            },
        ],
    },
    {
        path: "/user", //it should be username
        element: <UserLayout />,
        children: [
            {
                path: "/user",
                element: <Profile />,
            },
        ],
    },
]);

export default routes;
