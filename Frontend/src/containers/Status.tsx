import React from 'react';
import {Status as BaseStatus} from '@components/index';
import {EllipsisOutlined} from "@ant-design/icons";
import {useAppSelector} from "../hooks/redux";

const Status = () => {

    const {dialogs, currentDialog} = useAppSelector(state => state.dialogs)

    if (!dialogs.length || !currentDialog) {
        return null;
    }

    return <BaseStatus
        online={true}
        currentDialog={currentDialog}

    />
};

export default Status;