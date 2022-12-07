import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "@pages/Home";
import Auth from "@pages/Auth";
import AppRouter from "@routes/AppRouter";

function App() {
    return (
        <div className="wrapper">
            <AppRouter />
        </div>
    );
}

export default App;
