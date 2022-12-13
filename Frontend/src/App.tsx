import React, {useEffect, useRef} from 'react';
import AppRouter from "@routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {auth, fetchDialogs, fetchUsers} from "@redux/actions";
import {Spinner} from "@components/Spinner";

function App() {
    const dispatch = useAppDispatch();
    const {isLoadingRefresh} = useAppSelector(state => state.auth)

    const socket = useRef<any>()

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:8080/test')
        socket.current.onopen = () => {
            console.log('Подключение фронт')
        }

        socket.current.onmessage = (event) => {
            console.log('Сообщение с сервера',event.data)
        }

    }, [])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(auth.fetchCheckAuth())
        }
        dispatch(fetchDialogs.fetchDialogs())
        dispatch(fetchUsers.fetchUsers())
    }, [])

    return (
        <div className="wrapper">
            {isLoadingRefresh ? <Spinner center={true}/> : <AppRouter/>}
        </div>
    );
}

export default App;
