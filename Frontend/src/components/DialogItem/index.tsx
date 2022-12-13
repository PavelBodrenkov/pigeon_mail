import React, {FC} from 'react';
import classNames from "classnames";
import {MessageStatus} from "@components/index"
import './DialogItem.scss';
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import {getAvatar, getMessageTime} from "@utils/services/services";

const DialogItem: FC<any> = ({
                                 item,
                                 isMe
                             }) => {
    const {avatar, convid, unread, date, fullname, message, readed} = item
    const {currentDialog} = useAppSelector(state => state.dialogs)

    const activeDialog = currentDialog?.convid && currentDialog?.convid === convid
const test = true
    return (
        <Link to={`/#${convid}`}>
            <div
                className={classNames('dialogs__item',
                    {'active': activeDialog},
                     // {'dialogs__item--online': test}
                )}
            >
                {getAvatar(avatar, fullname, 40, test)}
                {/*<div className={'dialogs__item--avatar'}>*/}
                {/*    {getAvatar(avatar, fullname, 40, test)}*/}
                {/*</div>*/}
                <div className={'dialogs__item-info'}>
                    <div className={'dialogs__item-info-top'}>
                        <b>{fullname}</b>
                        <span>
                        {getMessageTime(new Date(date))}
                    </span>
                    </div>
                    <div className={'dialogs__item-info-bottom'}>
                        <p>{message}</p>
                        {!isMe && <MessageStatus isMe={isMe} isReaded={readed}/>}
                        {!isMe && unread > 0 &&
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