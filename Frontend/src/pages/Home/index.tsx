import React, {useEffect, useRef} from 'react';
import {ChatInput, LeftPanel, Profile, SideBar, Sider} from "@components/index";
import {Messages, Status} from "@containers/index";
import './Home.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useLocation} from "react-router-dom";
import {setCurrentDialog, setDialogs} from "@redux/reducers/dialogs";
import {dialogItem} from "./../../types/dialogTypes";
import {fetchDialogs, fetchUsers, messagesAction} from "@redux/actions";
// @ts-ignore
import Background from '../../assets/img/background-chat-vk-75.jpg';
import {Layout} from "antd";
import socket from '../../utils/socket/socket';
import {setOnlineUsers} from "@redux/reducers/users";

const Home = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {dialogs, currentDialog} = useAppSelector(state => state.dialogs)
    const {pane} = useAppSelector(state => state.leftPanel)
    const {messages} = useAppSelector(state => state.messages)
    const {user} = useAppSelector(state => state.auth)
    const {convid} = currentDialog
    const messagesRef = useRef<any>(null);

     useEffect(() => {
    //     socket.emit('login', user.id)
    //     socket.on('login', (msg) => {
    //         console.log('socket', socket.id)
    //         dispatch(setOnlineUsers(msg))
    //     })
        dispatch(fetchUsers.fetchUsers())
    //     // dispatch(fetchDialogs.fetchDialogs())
    //     socket.emit('getDialogs', user.id, user.fullname)
    //     socket.on('getDialogs', (msg) => {
    //         dispatch(setDialogs(msg))
    //     })
     }, [])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo(0, 999999);
        }
    }, [messages]);

    useEffect(() => {
        if (location) {
            const dialogId = location.hash.split('#').pop();
            const dialog = dialogs.find((dialog: dialogItem) => dialog.convid === Number(dialogId))
            if (dialog) {
                localStorage.setItem('currentDialog', String(dialog.convid))
                dispatch(messagesAction.fetchMessages(dialog.userid))
                dispatch(setCurrentDialog(dialog))
                socket.emit('joinRoom', {username: user.fullname, user_id: user.id, room: dialog.convid});
                // socket.on('message_info', (msg) => {
                //     console.log(msg)
                // })
            }
        }
    }, [location]);

    const renderSiderPane = () => {
        switch (pane) {
            case 'chat': {
                return <SideBar/>
            }
            case 'settings': {
                return <div style={{color: 'white'}}>Настройки</div>
            }
            case 'profile': {
                return <Profile/>
            }
        }
    }

    return (
        <Layout style={{width: '100%', height: '100%'}}>
            <section className={'home'}>
                <div className={'chat'}>
                    <LeftPanel pane={pane}/>
                    <div className={'chat__sidebar'}>
                        {renderSiderPane()}
                    </div>
                    <div className={'chat__dialog'}>
                        {convid &&
                            <>
                                <Status/>
                                <div
                                    className={'chat__dialog-messages'}
                                    ref={messagesRef}
                                >
                                    <Messages/>
                                </div>
                                <div className={'chat__dialog-input'}>
                                    <ChatInput/>
                                </div>
                            </>
                        }
                    </div>
                    <Sider/>
                </div>
            </section>
        </Layout>
    );
};

export default Home;