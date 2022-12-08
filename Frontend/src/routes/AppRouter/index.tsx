import {Routes, Route} from 'react-router-dom'
import PrivateRoute from "@routes/AppRouter/PrivateRoute";
import {HOME, LOGIN, REGISTER} from "@utils/constants";
import {Auth, Home} from "@pages/index";
import GuestRoute from "@routes/AppRouter/GuestRoute";
import {Spinner} from "@components/Spinner";

const AppRouter = () => {
    const loading = false
    return loading ?
        (
            <Spinner center={true} size={'large'}/>
        )
        :
        (
            <Routes>
                <Route
                    path={HOME}
                    element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }
                />
                <Route path={LOGIN} element={
                    <GuestRoute>
                        <Auth type={LOGIN}/>
                    </GuestRoute>
                }/>
                <Route path={REGISTER} element={
                    <GuestRoute>
                        <Auth type={REGISTER}/>
                    </GuestRoute>
                }/>
            </Routes>
        )
}

export default AppRouter