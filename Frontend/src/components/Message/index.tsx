import React, {FC, useState} from 'react';
import classNames from "classnames";
// @ts-ignore
import readedSvg from '../../assets/img/readed.svg';
// @ts-ignore
import noReadedSvg from '../../assets/img/noreaded.svg';
import {Dropdown} from "antd";
import './Message.scss';
import {Time, MessageStatus} from "@components/index";
import type {MenuProps} from 'antd';
import {getAvatar} from "@utils/services/services";

interface MessageProps {
    avatar: string,
    text?: string,
    date: string,
    user: any,
    isMe?: boolean,
    isReaded?: number,
    attachments?: {
        id: number,
        filename: string,
        url: string
    }[],
    isTyping?: boolean
}

const Message: FC<any> = ({
                              avatar,
                              date,
                              message,
                              isMe,
                              isTyping = false,
                              readed,
                              user,
                              fullname,
                              id,
                              handleDeleteMessage
                          }) => {

    const items: MenuProps['items'] = [
        {
            label: (<div onClick={() => handleDeleteMessage(id)}>Удалить</div>),
            key: id,
        }
    ];

    return (

        <div className={classNames('message',
            {'message--isme': isMe},
            // {'message--isTyping': isTyping},
            // {'message--image': attachments && attachments.length === 1}
        )}>
            <div className={'message__content'}>
                <MessageStatus isMe={isMe} isReaded={readed}/>
                {/*<div className={'message__avatar'}>*/}
                    {isMe ? getAvatar(user.avatar, user.fullname, 33, 0)
                        : getAvatar(avatar, fullname, 33, 0)
                    }
                {/*</div>*/}
                <Dropdown menu={{items}} trigger={['contextMenu']}>
                    <div className={'message__info'}>
                        {
                            message && (
                                <div className={'message__bubble'}>
                                    {message && !isTyping && <p className={'message__text'}>{message}</p>}
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
                        {/*<div className={'message__attachments'}>*/}
                        {/*    /!*{attachments && attachments.map((photo: { filename: string, url: string, id: number }) => {*!/*/}
                        {/*    /!*    const {filename, url, id} = photo*!/*/}
                        {/*    /!*    return (*!/*/}
                        {/*    /!*        <div className={'message__attachments-item'} key={id}>*!/*/}
                        {/*    /!*            <img src={url} alt={filename}/>*!/*/}
                        {/*    /!*        </div>*!/*/}
                        {/*    /!*    )*!/*/}
                        {/*    /!*})}*!/*/}
                        {/*</div>*/}
                        {date && <span className={'message__date'}>
                        <Time date={date}/>
                        </span>
                        }
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export default Message;