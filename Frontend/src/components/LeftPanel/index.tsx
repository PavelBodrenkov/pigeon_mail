import React, {useState} from 'react';
import './LeftPanel.scss'
import {SendOutlined, SettingOutlined, UserOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setPane} from "@redux/reducers/leftPanel";
import classNames from "classnames";
import {Avatar} from "antd";
import {getAvatar} from "@utils/services/services";

const LeftPanel = ({pane}) => {

    const {user} = useAppSelector(state => state.auth)
    const {online_users} = useAppSelector(state => state.users)

    const dispatch = useAppDispatch();

    const handlePane = (key) => {
        dispatch(setPane(key))
    }

    const items = [
        {
            key: 'chat',
            name: 'Чат',
            icon: <SendOutlined className={'left-panel__wrapper-pane_content_icon'}/>,
        },
        {
            key: 'settings',
            name: 'Настройки',
            icon: <SettingOutlined className={'left-panel__wrapper-pane_content_icon'}/>,
        }
    ]

    const items2 = [
        {
            key: 'help',
            name: 'Помощь',
            icon: <QuestionCircleOutlined className={'left-panel__wrapper-pane_content_icon'}/>,
        },
        {
            key: 'profile',
            name: 'Профиль',
            icon: getAvatar(user.avatar, user.fullname, 40, online_users[user.id] ? 1 : 0),
        }
    ]

    return (
        <div className={'left-panel'}>
            <div className={'left-panel__wrapper'}>
                <div>
                    {items.map((item) => {
                        return (
                            <div
                                key={item.key}
                                className={classNames('left-panel__wrapper-pane',
                                    {'left-panel__wrapper-pane--active': pane === item.key})}
                                onClick={() => handlePane(item.key)}
                            >
                                <div className={'left-panel__wrapper-pane_content'}>
                                    <div>
                                        {item.icon}
                                    </div>
                                    <b>{item.name}</b>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {items2.map((item) => {
                        return (
                            <div
                                key={item.key}
                                className={classNames('left-panel__wrapper-pane',
                                    {'left-panel__wrapper-pane--active': pane === item.key})}
                                onClick={() => handlePane(item.key)}
                            >
                                <div className={'left-panel__wrapper-pane_content'}>
                                    <div>
                                        {item.icon}
                                    </div>
                                    <b>{item.name}</b>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default LeftPanel;