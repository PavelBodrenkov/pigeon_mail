import React from 'react';
import {Message} from "@components/index";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Avatar} from "antd";
import {messagesAction} from "@redux/actions";

const Messages = ({messages}) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)

    const getAvatar = (avatar: string, fullname:string, size?:number) => {
        if (avatar) {
            return (
                <Avatar size={size || 40} src={avatar} className={'avatar'}/>
            )
        } else {
            let tmp = fullname.split('')[0].toUpperCase()
            return <Avatar
                size={size || 40}
                className={'avatar'}
                style={{backgroundColor: '#f56a00'}}>
                {tmp}
            </Avatar>
        }
    }

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
                            getAvatar={getAvatar}
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