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
import YourCourses from "./Components/Profile/YourCourses";
import YourCertificates from "./Components/Profile/YourCertificates";
import BillingHistories from "./Components/Profile/BillingHistories";
import AdminLayout from "./Layouts/AdminLayout";
import BlogsList from "./Components/Admin/BlogsList";
import UsersList from "./Components/Admin/UsersList";
import Purchase from "./Components/Admin/Purchase";
import CoursesList from "./Components/Admin/CoursesList";
import BlogForm from "./Components/Admin/BlogForm";
import ContactMessage from "./Components/Admin/ContactMessage";
import CourseBasicForm from "./Components/Admin/CourseBasicForm";
import CourseDetailsForm from "./Components/Admin/CourseDetailsForm";
import Reviews from "./Components/Admin/Reviews";
import CoursesCategory from "./Components/Admin/CoursesCategory";
import BlogsCategory from "./Components/Admin/BlogsCategory";
import AdminProfile from "./Components/Admin/AdminProfile";
import UserDetails from "./Components/Admin/UserDetails";
import Settings from "./Components/Admin/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Subscribers from "./Components/Admin/Subscribers";
import UserProfile from "./Pages/UserProfile";
import CreateQuiz from "./Components/Admin/CreateQuiz";
import Quiz from "./Pages/Quiz";
import Dashboard from "./Components/Admin/Dashboard";
import ReviewModal from "./Components/ReviewModal";

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
                path: "/blog/:id",
                element: <Blog />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/course/:id", //it should be course name
                element: <CourseOverview />,
            },
            {
                path: "/course/:id/details", //it should be course name with user (John/frontendDev)
                element: <CourseDetails />,
            },
            {
                path: "/user/profile", //user must be the name and it is user's pf from other's pov
                element: <UserProfile />,
            },
            {
                path: "/course/:id/quiz", //it should be course name
                element: <Quiz />,
            },
            {
                path: "/review", //it should be course name
                element: <ReviewModal />,
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/user", //it should be username
        element: <UserLayout />,
        children: [
            {
                path: "/user",
                element: <Profile />,
            },
            {
                path: "/user/courses",
                element: <YourCourses />,
            },
            {
                path: "/user/certificates",
                element: <YourCertificates />,
            },
            {
                path: "/user/billing",
                element: <BillingHistories />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <Dashboard />,
            },
            {
                path: "/admin/profile",
                element: <AdminProfile />,
            },
            {
                path: "/admin/purchase",
                element: <Purchase />,
            },
            {
                path: "/admin/courses/create",
                element: <CourseBasicForm />,
            },
            {
                path: "/admin/courses/create/details",
                element: <CourseDetailsForm />,
            },
            {
                path: "/admin/courses/create/quiz",
                element: <CreateQuiz />,
            },
            {
                path: "/admin/courses/category",
                element: <CoursesCategory />,
            },
            {
                path: "/admin/courses",
                element: <CoursesList />,
            },
            {
                path: "/admin/blogs/category",
                element: <BlogsCategory />,
            },
            {
                path: "/admin/blogs",
                element: <BlogsList />,
            },
            {
                path: "/admin/blogs/create",
                element: <BlogForm />,
            },
            {
                path: "/admin/blogs/:id/edit",
                element: <BlogForm />,
            },
            {
                path: "/admin/users",
                element: <UsersList />,
            },
            {
                path: "/admin/subscribers",
                element: <Subscribers />,
            },
            {
                path: "/admin/user/details",
                element: <UserDetails />,
            },
            {
                path: "/admin/reviews",
                element: <Reviews />,
            },
            {
                path: "/admin/contacts/:id?",
                element: <ContactMessage />,
            },
            {
                path: "/admin/settings",
                element: <Settings />,
            },
        ],
    },
]);

export default routes;
