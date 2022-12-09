import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {messagesAction} from "@redux/actions";
import {Spinner} from '@components/Spinner';
import {Alert, Empty} from "antd";

import {Messages as BaseMessages} from '@components/index'

const Messages: FC<any> = () => {

    const dispatch = useAppDispatch();
    const {currentDialog} = useAppSelector(state => state.dialogs)
    const {messages, isLoading, error} = useAppSelector(state => state.messages)

    useEffect(() => {
        if (currentDialog > 0) {
            dispatch(messagesAction.fetchMessages(currentDialog))
        }
    }, [currentDialog])

    return (
        <>
            {isLoading &&
                <div style={{position: 'relative', width: '100%', height: 50}}>
                    <Spinner text={'Загрузка диалогов...'} textSize={15} center={true}/>
                </div>
            }
            {error && <Alert message={error} type="error"/>}
            {!error && !isLoading && (
                messages.length !== 0 ?
                    <BaseMessages
                        items={messages}
                    />
                    :
                    <Empty description={
                        <span>
                             Нет сообщений
                        </span>
                    }/>
            )
            }
        </>
    );

};

export default Messages;