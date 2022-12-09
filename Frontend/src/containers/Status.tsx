import React from 'react';
import {Status as BaseStatus} from '@components/index';
import {EllipsisOutlined} from "@ant-design/icons";
import {useAppSelector} from "../hooks/redux";

const Status = () => {

    const {items, currentDialog} = useAppSelector(state => state.dialogs)

    if (!items.length || !currentDialog) {
        return null;
    }

    const currentDialogObj:any = items.find((dialog:any) => dialog.convid == currentDialog)

    return <BaseStatus online={true} fullname={currentDialogObj?.fullname} />
};

export default Status;