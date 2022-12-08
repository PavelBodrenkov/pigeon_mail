import { Navigate, useLocation } from "react-router-dom";
import {useAppSelector} from "../../../hooks/redux";


//@ts-ignore
const PrivateRoute = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.users)
    const location = useLocation();
    const url = new URLSearchParams();
    url.set("redirect", location.pathname + location.search);

    return isAuth ? (
        children
    ) : (
        <Navigate
            to={{
                pathname: "/login",
                search: url.toString(),
            }}
        />
    );
}

export default PrivateRoute