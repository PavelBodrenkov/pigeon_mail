import {LOGIN, REGISTER, HOME} from "@utils/constants";
import Auth from "@pages/Auth";
import Home from '@pages/Home';

export const publicRouter = [
    {path:LOGIN, Component: Auth},
    {path:REGISTER, Component: Auth}
]

export const protectedRoute = [
    {path:HOME, Component: Home}
]