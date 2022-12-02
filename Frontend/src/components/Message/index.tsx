import React, {FC} from 'react';
import classNames from "classnames";
// @ts-ignore
import readedSvg from '../../assets/img/readed.svg';
// @ts-ignore
import noReadedSvg from '../../assets/img/noreaded.svg';

import {UserOutlined} from '@ant-design/icons';
import {Avatar} from "antd";
import './Message.scss';
import {Time, MessageStatus} from "@components/index";

interface MessageProps {
    avatar: string,
    text?: string,
    date: string,
    user: any,
    isMe?: boolean,
    isReaded?: boolean,
    attachments?: {
        filename: string,
        url: string
    }[],
    isTyping?: boolean
}

const Message: FC<MessageProps> = ({
                                       avatar,
                                       user,
                                       text,
                                       date,
                                       isMe = false,
                                       isReaded = false,
                                       attachments,
                                       isTyping = false
                                   }) => {

    return (
        <div className={classNames('message',
            {'message--isme': isMe},
            {'message--isTyping': isTyping},
            {'message--image': attachments && attachments.length === 1}

        )}>
            <div className={'message__content'}>
                <MessageStatus isMe={isMe} isReaded={isReaded}/>
                <div className={'message__avatar'}>
                    <Avatar size={33} src={avatar} className={'avatar'}/>
                </div>
                <div className={'message__info'}>
                    {
                        text && isTyping && (
                            <div className={'message__bubble'}>
                                {text && <p className={'message__text'}>{text}</p>}
                                {isTyping &&
                                    <div className={'message__typing'}>
                                        <span/>
                                        <span/>
                                        <span/>
                                    </div>
                                }

                            </div>
                        )
                    }
                    <div className={'message__attachments'}>
                        {attachments && attachments.map((photo: { filename: string, url: string }) => {
                            const {filename, url} = photo
                            return (
                                <div className={'message__attachments-item'}>
                                    <img src={url} alt={filename}/>
                                </div>
                            )
                        })}
                    </div>
                    {date && <span className={'message__date'}>
                        <Time date={date}/>
                    </span>}
                </div>
            </div>
        </div>
    );
};

export default Message;