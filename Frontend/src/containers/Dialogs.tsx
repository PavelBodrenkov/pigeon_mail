import React, {FC, useEffect} from 'react';
import {Dialogs as BaseDialogs} from '@components/index';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchDialogs} from "@redux/actions";
import {Spinner} from '@components/Spinner';
import {Alert, Empty} from "antd";

const Dialogs: FC<any> = () => {

    const dispatch = useAppDispatch();
    const {items, isLoading, error} = useAppSelector(state => state.dialogs)

    useEffect(() => {
        dispatch(fetchDialogs())
    }, [])

    // const onChangeInput = (value: string) => {
    //     setFiltered(
    //         items.filter((dialog: dialogItem) => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) > 0)
    //     )
    //     setInputValue(value)
    // }

    return (
        <>
            {isLoading &&
                <div style={{position: 'relative', width: '100%', height: 50}}>
                    <Spinner text={'Загрузка диалогов...'} textSize={15} center={true}/>
                </div>
            }
            {error && <Alert message={error} type="error"/>}
            {!error && !isLoading && (
                items.length !== 0 ?
                    <BaseDialogs
                        items={items}
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