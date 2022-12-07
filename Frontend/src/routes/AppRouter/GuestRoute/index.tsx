import {FC} from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";


const GuestRoute:FC<any> = ({ children, ...rest }) => {

    const auth = false
    const location = useLocation();
    const url = new URLSearchParams(location.search.slice(1));

    return auth ? <Navigate to={url.get("redirect") || "/"} /> : children;
}

export default GuestRoute;