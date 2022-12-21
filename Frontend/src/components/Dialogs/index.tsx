import React, {FC} from 'react';
import {DialogItem} from "@components/index";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import {Avatar} from "antd";
import {dialogItem} from "types/dialogTypes";

interface DialogsProps {
    dialogs:dialogItem[],
}

const Dialogs: FC<DialogsProps> = ({dialogs}) => {

    const { user } = useAppSelector(state => state.auth)
    const { online_users } = useAppSelector(state => state.users)

    return (
        <div className={'dialogs'}>
            {dialogs?.map((item) => {
                const {sender, convid, userid} = item
                return (
                    <DialogItem
                        key={convid}
                        item={item}
                        isMe={user.id === sender}
                        is_online={online_users[userid] || 0}
                    />
                )
            })
            }
        </div>
    );
};

export default Dialogs;