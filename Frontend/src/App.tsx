import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "@pages/Home";
import Auth from "@pages/Auth";
import AppRouter from "@routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {auth} from "@redux/actions";
import {Spinner} from "@components/Spinner";

function App() {
    const dispatch = useAppDispatch();
    const {isLoadingRefresh} = useAppSelector(state => state.users)

    useEffect(() => {
        dispatch(auth.fetchCheckAuth())
    }, [])

    return (
        <div className="wrapper">
            {isLoadingRefresh ? <Spinner center={true}/> :  <AppRouter/>}
        </div>
    );
}

export default App;
