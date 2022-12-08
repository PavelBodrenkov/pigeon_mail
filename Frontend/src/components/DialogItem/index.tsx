import React, {FC} from 'react';
import {Avatar} from "antd";
import classNames from "classnames";
import {MessageStatus, Time} from "@components/index"
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'
import './DialogItem.scss';
import {useAppDispatch} from "../../hooks/redux";
import {setCurrentDialog} from "@redux/reducers/dialogs";

const DialogItem: FC<any> = ({
                                 fullname,
                                 avatar,
                                 isMe,
                                 convid,
                                 unreaded,
                                 date,
                                 message,
                                 sender

                             }) => {

    const dispatch = useAppDispatch();

    const getMessageTime = (created_at) => {
        if (isToday(created_at)) {
            return format(created_at, "HH:mm")
        } else {
            return format(created_at, "dd.MM.YYY")
        }
    }

    const getAvatar = (avatar: string) => {
        if (avatar) {
            return (
                <Avatar size={40} src={avatar} className={'avatar'}/>
            )
        } else {
            let tmp = fullname.split('')[0].toUpperCase()
            return <Avatar
                size={40}
                className={'avatar'}
                style={{backgroundColor: '#f56a00'}}>
                {tmp}
            </Avatar>
        }
    }

    return (
        <div
            className={classNames('dialogs__item',
                // {'dialogs__item--online': user.isOnline}
            )}
            onClick={() => dispatch(setCurrentDialog(sender))}
        >
            <div className={'dialogs__item--avatar'}>
                {getAvatar(avatar)}
            </div>
            <div className={'dialogs__item-info'}>
                <div className={'dialogs__item-info-top'}>
                    <b>{fullname}</b>
                    <span>
                        {/*{getMessageTime(date)}*/}
                        {/*<Time date={message.created_at}/>*/}
                    </span>
                </div>
                <div className={'dialogs__item-info-bottom'}>
                    <p>{message}</p>
                    {isMe && <MessageStatus isMe={isMe} isReaded={unreaded}/>}
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