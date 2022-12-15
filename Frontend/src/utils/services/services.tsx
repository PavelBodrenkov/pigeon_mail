import {Avatar} from "antd";
import React from "react";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import classNames from "classnames";
import './services.scss';

export const getAvatar = (
    avatar: string,
    fullname: string,
    size?:number,
    online:number = 0
) => {
    if (avatar) {
        return (
            <Avatar size={size || 40} src={avatar} className={'avatar'}/>
        )
    } else {
        let tmp = fullname.split('')[0].toUpperCase()
        return (
            <div className={classNames('custom-avatar',
                {'custom-avatar--online': online > 0})}
            >
                <div className={'custom-avatar__content'}>
                    <Avatar
                        size={size || 40}
                        className={'avatar'}
                        style={{backgroundColor: '#f56a00'}}>
                        {tmp}
                    </Avatar>
                </div>
            </div>
        )
    }
}

export const getMessageTime = (created_at) => {
    if (isToday(created_at)) {
        return format(created_at, "HH:mm")
    } else {
        return format(created_at, "dd.MM.YYY")
    }
}