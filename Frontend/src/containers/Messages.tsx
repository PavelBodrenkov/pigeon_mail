import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";

import {Alert, Empty} from "antd";

import {Messages as BaseMessages} from '@components/index'
import socket from "@utils/socket/socket";
import {setMessages} from "@redux/reducers/messages";

const Messages: FC<any> = () => {

    const {messages, isLoadingGetMessage, errorGetMessage} = useAppSelector(state => state.messages)
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('message', (message) => {
            dispatch(setMessages(message))
        });

        socket.on('message_info', (message) => {
            console.log('message_info', message)
        });

        socket.on('roomUsers', ({ room, users }) => {
            console.log(room, users)
        });
    }, [])

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