import React, {FC} from 'react';
import {Dialogs as BaseDialogs} from '@components/index';
import {useAppSelector} from "../hooks/redux";
import {Spinner} from '@components/Spinner';
import {Alert, Empty} from "antd";


const Dialogs: FC<any> = ({filtered}) => {

    const {isLoadingDialogs, errorDialogs} = useAppSelector(state => state.dialogs)

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