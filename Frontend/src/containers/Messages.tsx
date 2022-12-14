import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";

import {Alert, Empty} from "antd";

import {Messages as BaseMessages} from '@components/index'

const Messages: FC<any> = () => {

    const {messages, isLoadingGetMessage, errorGetMessage} = useAppSelector(state => state.messages)

    return (
        <>
            {/*{isLoading &&*/}
            {/*    <div style={{position: 'relative', width: '100%', height: 50}}>*/}
            {/*        <Spinner text={'Загрузка диалогов...'} textSize={15} center={true}/>*/}
            {/*    </div>*/}
            {/*}*/}
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