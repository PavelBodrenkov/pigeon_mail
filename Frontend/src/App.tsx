import React, {useEffect} from 'react';
import AppRouter from "@routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {auth, fetchDialogs, fetchUsers} from "@redux/actions";
import {Spinner} from "@components/Spinner";

function App() {
    const dispatch = useAppDispatch();
    const {isLoadingRefresh} = useAppSelector(state => state.auth)
    const {currentDialog} = useAppSelector(state => state.dialogs)

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(auth.fetchCheckAuth())
        }
        dispatch(fetchDialogs.fetchDialogs())
        dispatch(fetchUsers.fetchUsers())
    }, [])

    return (
        <div className="wrapper">
            {isLoadingRefresh ? <Spinner center={true}/> :  <AppRouter/>}
        </div>
    );
}

export default App;
