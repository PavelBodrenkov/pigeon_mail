import React, {FC} from 'react';
import './Dialogs.scss'
import {DialogItem} from "@components/index";
import sortBy from 'lodash/sortBy'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import {Avatar} from "antd";
import {setCurrentDialog, setPartner} from "@redux/reducers/dialogs";

const Dialogs: FC<any> = ({items}) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.users)

    const getMessageTime = (created_at) => {
        if (isToday(created_at)) {
            return format(created_at, "HH:mm")
        } else {
            return format(created_at, "dd.MM.YYY")
        }
    }

    const getAvatar = (avatar: string, fullname:string) => {
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
        <div className={'dialogs'}>
            {items?.map((item) => {
                const {sender, convid} = item
                return (
                    <DialogItem
                        key={convid}
                        item={item}
                        isMe={user.id === sender}
                        getAvatar={getAvatar}
                        getMessageTime={getMessageTime}
                    />
                )
            })
            }
        </div>
    );
};

export default Dialogs;