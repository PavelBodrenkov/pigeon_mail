import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";

import {Alert, Empty} from "antd";

import {Messages as BaseMessages} from '@components/index'
import socket from "@utils/socket/socket";
import {setMessages} from "@redux/reducers/messages";
import {setDialogs} from "@redux/reducers/dialogs";
import {useLocation} from "react-router-dom";

const Messages: FC<any> = () => {

    const {messages, isLoadingGetMessage, errorGetMessage} = useAppSelector(state => state.messages)
    const {currentDialog} = useAppSelector(state => state.dialogs)
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const dialogId = location.hash.split('#').pop();
        socket.on('message', (message) => {
            console.log('message', message)
            dispatch(setMessages(message.messages))
            // socket.emit('getDialogs', (user.id))
            // socket.on('getDialogs', (msg) => {
            //     dispatch(setDialogs(msg))
            //     console.log('DIALOGS', msg)
            // })
            // dispatch(setDialogs(message.dialogs))
        });

        // socket.on('message_info', (message) => {
        //     console.log('message_info', message)
        // });

        socket.on('roomUsers', ({room, users}) => {
            console.log(room, users)
        });
    }, [location])

    return (
        <>
            {errorGetMessage.message && <Alert message={errorGetMessage.message} type="error"/>}
            {!errorGetMessage.message && (
                !isLoadingGetMessage && (messages.length !== 0 ?
                    <BaseMessages
                        messages={messages}
                    />
                    :
                    <Empty description={
                        <span>
                             Нет сообщений
                        </span>
                    }/>)
            )
            }
        </>
    );

};

export default Messages;