import React from 'react';
import {Message} from "@components/index";
import {useAppSelector} from "../../hooks/redux";

const Messages = ({items}) => {

    const { user } = useAppSelector(state => state.users)

    return items ? (
            <div
                style={{
                maxWidth: '60%',
                    margin:'0 auto'
            }}
                // ref={blockRef}
            >
                {items.map((m) => {
                    const {avatar, date, fullname, message, sender, id, readed} = m
                    return (
                        <Message
                            key={id}
                            avatar={avatar}
                            date={date}
                            fullname={fullname}
                            message={message}
                            isMe={user.id === sender}
                            readed={readed}
                        />
                    )
                })}
            </div>
        )
        :
        (<div>Откройте диалог</div>)
};

export default Messages;