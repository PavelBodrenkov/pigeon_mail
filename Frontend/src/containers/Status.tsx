import React from 'react';
import {Status as BaseStatus} from '@components/index';
import {EllipsisOutlined} from "@ant-design/icons";
import {useAppSelector} from "../hooks/redux";

const Status = () => {

    const {dialogs, currentDialog} = useAppSelector(state => state.dialogs)
    const { online_users } = useAppSelector(state => state.users)
    if (!dialogs.length || !currentDialog) {
        return null;
    }


    const isOnline = online_users[currentDialog.userid]


    return <BaseStatus
        online={isOnline || 0}
        currentDialog={currentDialog}
    />
};

export default Status;