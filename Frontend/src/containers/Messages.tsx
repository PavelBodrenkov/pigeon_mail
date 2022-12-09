import React, {FC, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {messagesAction} from "@redux/actions";
import {Spinner} from '@components/Spinner';
import {Alert, Empty} from "antd";

import {Messages as BaseMessages} from '@components/index'

const Messages: FC<any> = () => {

    const {messages, isLoadingMessage, error} = useAppSelector(state => state.messages)



    return (
        <>
            {/*{isLoading &&*/}
            {/*    <div style={{position: 'relative', width: '100%', height: 50}}>*/}
            {/*        <Spinner text={'Загрузка диалогов...'} textSize={15} center={true}/>*/}
            {/*    </div>*/}
            {/*}*/}
            {error && <Alert message={error} type="error"/>}
            {!error && (
                !isLoadingMessage && (messages.length !== 0 ?
                    <BaseMessages
                        items={messages}
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