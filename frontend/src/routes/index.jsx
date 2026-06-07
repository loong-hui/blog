import { lazy } from "react";
//路由懒加载
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateArticle = lazy(() => import("../pages/CreateArticle"));
const Setting = lazy(() => import("../pages/Setting"));
const Profile = lazy(() => import("../pages/Profile"));
const Article = lazy(() => import("../pages/Article"))
const EditArticle = lazy(() => import("../pages/Article/EditArticle"))
import AuthRouter from "./AuthRouter";
import Error from "../components/Error/Error";
export default [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/article/create",
        element: <CreateArticle />
    },
    {
        path: "/setting",
        element: <AuthRouter><Setting /></AuthRouter>
    },
    {
        path: "/profile/:username",
        element: <AuthRouter><Profile /></AuthRouter>
    },
    {
        path: "/article/:slug",
        element: <Article />
    },
    {
        path: "/article/edit/:slug",
        element: <AuthRouter><EditArticle /></AuthRouter>
    },
    {
        path: "/article/edit/:slug",
        element: <AuthRouter><EditArticle /></AuthRouter>
    },
    {
        path: "*",//通配符
        element: <AuthRouter><Error error={"xxx"} /></AuthRouter>
    }
]