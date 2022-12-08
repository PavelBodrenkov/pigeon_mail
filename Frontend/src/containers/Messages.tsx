import React, {FC, useEffect, useState} from 'react';
import {dialogItem, dialogProps} from "../types/dialogTypes";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchMessages} from "@redux/actions";
import {Spinner} from '@components/Spinner';
import {Alert} from "antd";

import {Messages as BaseMessages} from '@components/index'

const Messages: FC<any> = () => {

    const dispatch = useAppDispatch();
    const { currentDialog} = useAppSelector(state => state.dialogs)
    const { messages } = useAppSelector(state => state.messages)
    const { items, isLoading, error} = useAppSelector(state => state.dialogs)
    const [filtered, setFiltered] = useState<dialogItem[]>(Array.from(items))

    console.log('messages', messages)

    useEffect(() => {
        if(currentDialog > 0) {
            dispatch(fetchMessages(currentDialog))
        }
    }, [currentDialog])

    // const onChangeInput = (value: string) => {
    //     setFiltered(
    //         items.filter((dialog: dialogItem) => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) > 0)
    //     )
    //     setInputValue(value)
    // }

    return (
        <>
            {isLoading &&
                <div style={{position: 'relative', width: '100%', height:50}}>
                    <Spinner text={'Загрузка диалогов...'} textSize={15} center={true}/>
                </div>
            }
            {error && <Alert message={error} type="error" />}
            {!error && !isLoading && (items.length !== 0 && currentDialog > 0 ?
                    <BaseMessages
                        items={items}
                    />
                    :
                    <b>Выберите диалог</b>
                )

            }
        </>
    );
};

export default Messages;