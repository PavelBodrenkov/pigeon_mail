import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "@pages/Home";
import Auth from "@pages/Auth";

function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path={'/im'} element={<Home/>}/>
                {/*<Route path={'register'} element={<Auth login={false}/>}/>*/}
            </Routes>
        </div>
    );
}

export default App;
