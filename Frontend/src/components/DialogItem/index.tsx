import React, {FC} from 'react';
import {Avatar} from "antd";
import classNames from "classnames";
import {MessageStatus} from "@components/index"
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'
import './DialogItem.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setCurrentDialog, setPartner} from "@redux/reducers/dialogs";
import {Link} from "react-router-dom";

const DialogItem: FC<any> = ({
                                 item,
                                 isMe,
                                 getAvatar,
                                 getMessageTime
                             }) => {

    const {avatar, convid, unread, date, fullname, message, sender, userid} = item

    return (
        <Link to={`/#${convid}`}>
            <div
                className={classNames('dialogs__item',
                    // {'dialogs__item--online': user.isOnline}
                )}
            >
                <div className={'dialogs__item--avatar'}>
                    {getAvatar(avatar, fullname)}
                </div>
                <div className={'dialogs__item-info'}>
                    <div className={'dialogs__item-info-top'}>
                        <b>{fullname}</b>
                        <span>
                        {getMessageTime(new Date(date))}
                    </span>
                    </div>
                    <div className={'dialogs__item-info-bottom'}>
                        <p>{message}</p>
                        {isMe && <MessageStatus isMe={isMe} isReaded={unread}/>}
                        {unread > 0 &&
                            <div className={'dialogs__item-info-bottom-count'}>
                                {unread}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default DialogItem;