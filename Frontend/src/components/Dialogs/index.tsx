import React, {FC} from 'react';
import './Dialogs.scss'
import {DialogItem} from "@components/index";
import sortBy from 'lodash/sortBy'
import {useAppSelector} from "../../hooks/redux";

const Dialogs: FC<any> = ({items}) => {

    const { user } = useAppSelector(state => state.users)
    return (
        <div className={'dialogs'}>
            {items?.map((item) => {
                const {avatar, convid, unread, date, fullname, message, sender, userid} = item
                return (
                    <DialogItem
                        fullname={fullname}
                        avatar={avatar}
                        convid={convid}
                        key={convid}
                        unreaded={unread}
                        message={message}
                        date={date}
                        sender={sender}
                        isMe={user.id === sender}
                    />
                )
            })
            }
        </div>
    );
};

export default Dialogs;