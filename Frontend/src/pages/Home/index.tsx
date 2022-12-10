import React, {useEffect, useRef} from 'react';
import {ChatInput, HoverButton, SideBar, Sider} from "@components/index";
import {Messages, Status} from "@containers/index";
import './Home.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useLocation, useNavigate} from "react-router-dom";
import {setCurrentDialog} from "@redux/reducers/dialogs";
import {dialogItem} from "./../../types/dialogTypes";
import {messagesAction} from "@redux/actions";
// @ts-ignore
import Background from '../../assets/img/background-chat-vk-75.jpg';
import {Button, Form, Image, Input, Layout, Space} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";

const Home = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {dialogs, currentDialog} = useAppSelector(state => state.dialogs)
    const {messages} = useAppSelector(state => state.messages)
    const {convid} = currentDialog
    let navigate = useNavigate();
    const messagesRef = useRef<any>(null);

    useEffect(() => {
        if(localStorage.getItem('currentDialog') && dialogs.length !== 0) {
            navigate(`#${Number(localStorage.getItem('currentDialog'))}`)
        }
    }, [dialogs])

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
            }
        }
    }, [location]);

    return (
        <Layout style={{width:'100%', height:'100%'}}>


        <section className={'home'}>
            <div className={'chat'}>
                <SideBar/>
                <div className={'chat__dialog'} >
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
                                <ChatInput />
                            </div>
                        </>
                    }
                </div>
                <Sider />
            </div>
        </section>
        </Layout>
    );
};

export default Home;