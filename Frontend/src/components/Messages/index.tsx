import React from 'react';
import {Message} from "@components/index";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {messagesAction} from "@redux/actions";

const Messages = ({messages}) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)

    const handleDeleteMessage = (id:number) => {
        dispatch(messagesAction.deleteMessage(id))
    }

    return messages ? (
            <div
                style={{
                maxWidth: '60%',
                    margin:'0 auto'
            }}
            >
                {messages.map((m) => {
                    const {avatar, date, fullname, message, sender, id, readed} = m
                    return (
                        <Message
                            key={id}
                            id={id}
                            avatar={avatar}
                            date={date}
                            fullname={fullname}
                            message={message}
                            isMe={user.id === sender}
                            readed={readed}
                            user={user}
                            handleDeleteMessage={handleDeleteMessage}
                        />
                    )
                })}
            </div>
        )
        :
        (<div>Откройте диалог</div>)
};

export default Messages;