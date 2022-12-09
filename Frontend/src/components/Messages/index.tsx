import React from 'react';
import {Message} from "@components/index";
import {useAppSelector} from "../../hooks/redux";

const Messages = ({items}) => {

    const { user } = useAppSelector(state => state.users)

    return items ? (
            <div>
                {items.map((m) => {
                    console.log('m', m)
                    const {avatar, date, fullname, message, sender, id} = m
                    return (
                        <Message
                            key={id}
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