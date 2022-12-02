import React, {FC} from 'react';
import {Avatar} from "antd";
import classNames from "classnames";
import {MessageStatus, Time} from "@components/index"
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'
import './DialogItem.scss';

const DialogItem: FC<any> = ({user, message, unreaded, isMe}) => {

    const getMessageTime = (created_at) => {
        if(isToday(created_at)) {
            return format(created_at, "HH:mm")
        } else {
            return format(created_at, "DD.MM.YYY")
        }
    }

    const getAvatar = (avatar:string) => {
        if (avatar) {
            return (
                <Avatar size={40} src={avatar} className={'avatar'}/>
            )
        } else {
            let tmp = user.fullname.split('')[0]
            return <Avatar size={40} className={'avatar'} style={{ backgroundColor: '#f56a00' }}>{tmp}</Avatar>
        }
    }

    return (
        <div className={classNames('dialogs__item', {'dialogs__item--online': user.isOnline})}>
            <div className={'dialogs__item--avatar'}>
                {getAvatar(user.avatar)}
            </div>
            <div className={'dialogs__item-info'}>
                <div className={'dialogs__item-info-top'}>
                    <b>{user.fullname}</b>
                    <span>
                        {getMessageTime(message.created_at)}
                        {/*<Time date={message.created_at}/>*/}
                    </span>
                </div>
                <div className={'dialogs__item-info-bottom'}>
                    <p>{message.text}</p>
                    {isMe && <MessageStatus isMe={isMe} isReaded={message.isReaded}/>}
                    {unreaded > 0 &&
                        <div className={'dialogs__item-info-bottom-count'}>
                            {unreaded}
                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default DialogItem;