import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "@pages/Home";
import Auth from "@pages/Auth";
import AppRouter from "@routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {auth} from "@redux/actions";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(auth.fetchCheckAuth())
    }, [])

    return (
        <div className="wrapper">
            <AppRouter/>
        </div>
    );
}

export default App;
