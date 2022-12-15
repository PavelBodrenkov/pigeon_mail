import React, {useEffect, useRef} from 'react';
import AppRouter from "@routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {auth, fetchDialogs, fetchUsers} from "@redux/actions";
import {Spinner} from "@components/Spinner";
// import socket from "@utils/socket/socket";
import {useLocation, useParams} from "react-router-dom";

function App() {
    const dispatch = useAppDispatch();
    const {isLoadingRefresh} = useAppSelector(state => state.auth)
    const {user} = useAppSelector(state => state.auth)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth.fetchCheckAuth())
        }
        dispatch(fetchDialogs.fetchDialogs())
        dispatch(fetchUsers.fetchUsers())
    }, [])

    useEffect(() => {
        if(user.id) {
            const socket = new WebSocket('ws://localhost:8080/')
            console.log('user.id', user.id)
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    is_online: 1,
                    id:user.id,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case 'connection':
                        console.log('Пользователь подключен')
                        break
                    case 'sendMessage':
                        console.log('msg', msg)
                        break
                }

            }
        }
    }, [user])

    return (
        <div className="wrapper">
            {isLoadingRefresh ? <Spinner center={true}/> : <AppRouter/>}
        </div>
    );
}

export default App;
