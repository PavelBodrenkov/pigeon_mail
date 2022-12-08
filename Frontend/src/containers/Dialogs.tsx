import React, {FC, useEffect, useState} from 'react';
import {Dialogs as BaseDialogs} from '@components/index';
import {dialogItem, dialogProps} from "../types/dialogTypes";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchDialogs} from "@redux/actions";
import {Spinner} from '@components/Spinner';
import {Alert} from "antd";

const Dialogs: FC<dialogProps> = ({ ownerId}) => {

    const dispatch = useAppDispatch();
    const { items ,currentDialog, isLoading, error} = useAppSelector(state => state.dialogs)
    const [inputValue, setInputValue] = useState<string>('')
    const [filtered, setFiltered] = useState<dialogItem[]>(Array.from(items))

    console.log('items', items)

    useEffect(() => {
        dispatch(fetchDialogs())
    }, [])

    const onChangeInput = (value: string) => {
        setFiltered(
            items.filter((dialog: dialogItem) => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) > 0)
        )
        setInputValue(value)
    }

    return (
        <>
            {isLoading &&
                <div style={{position: 'relative', width: '100%', height:50}}>
                    <Spinner text={'Загрузка диалогов...'} textSize={15} center={true}/>
                </div>
            }
            {error && <Alert message={error} type="error" />}
            {/*{!error && !isLoading && (filtered.length !== 0 ?*/}
            {/*    <BaseDialogs*/}
            {/*        ownerId={ownerId}*/}
            {/*        items={filtered}*/}
            {/*        onChangeInput={onChangeInput}*/}
            {/*        inputValue={inputValue}*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <b>Нет начатых диалогов</b>)*/}
            {/*}*/}
            {!error && !isLoading && (
                <BaseDialogs
                    ownerId={ownerId}
                    items={items}
                    onChangeInput={onChangeInput}
                    inputValue={inputValue}
                />
                )

            }
        </>
    );
};

export default Dialogs;