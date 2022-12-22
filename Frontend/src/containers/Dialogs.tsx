import React, {FC, useEffect} from 'react';
import {Dialogs as BaseDialogs} from '@components/index';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Spinner} from '@components/Spinner';
import {Alert, Empty} from "antd";
import socket from "@utils/socket/socket";
import {fetchDialogs} from "@redux/actions";


const Dialogs: FC<any> = ({filtered}) => {

    const {isLoadingDialogs, errorDialogs} = useAppSelector(state => state.dialogs)
    const dispatch = useAppDispatch();
    useEffect(() => {
        // fetchDialogs();
        dispatch(fetchDialogs.fetchDialogs())
        socket.on('SERVER:DIALOG_CREATED', () => {
            console.log('testDIALOG')
            dispatch(fetchDialogs.fetchDialogs())
        });
        socket.on('SERVER:NEW_MESSAGE', dispatch(fetchDialogs.fetchDialogs()));
        // socket.on('SERVER:MESSAGES_READED', updateReadedStatus);
        return () => {
            socket.removeListener('SERVER:DIALOG_CREATED', dispatch(fetchDialogs.fetchDialogs()));
            socket.removeListener('SERVER:NEW_MESSAGE', dispatch(fetchDialogs.fetchDialogs()));
        };
    }, [])

    return (
        <>
            {isLoadingDialogs &&
                <div style={{position: 'relative', width: '100%', height: 50}}>
                    <Spinner text={'Загрузка диалогов...'} textSize={15} center={true}/>
                </div>
            }
            {errorDialogs.message && <Alert message={errorDialogs.message} type="error"/>}
            {!errorDialogs.message && !isLoadingDialogs && (
                filtered.length !== 0 ?
                    <BaseDialogs
                        dialogs={filtered}
                    />
                    :
                    <Empty description={
                        <span>
                             Нет начатых диалогов
                        </span>
                    }/>
            )
            }
        </>
    );
};

export default Dialogs;