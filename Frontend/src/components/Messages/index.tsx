import React from 'react';
import {Message} from "@components/index";
import {useAppSelector} from "../../hooks/redux";

const Messages = ({items}) => {

    const { user } = useAppSelector(state => state.users)

    return items ? (
            <div>
                {items.map((m) => {
                    const {avatar, date, fullname, message, sender} = m
                    return (
                        <Message
                            avatar={avatar}
                            date={date}
                            fullname={fullname}
                            message={message}
                            isMe={user.id === sender}
                        />
                    )
                })}
            </div>
        )
        :
        (<div>Откройте диалог</div>)
};

export default Messages;