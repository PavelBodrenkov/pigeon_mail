import React, {useEffect, useRef} from 'react';
import {ChatInput, SideBar} from "@components/index";
import {Messages, Status} from "@containers/index";
import './Home.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useLocation} from "react-router-dom";
import {setCurrentDialog} from "@redux/reducers/dialogs";
import {dialogItem} from "./../../types/dialogTypes";
import {messagesAction} from "@redux/actions";
// @ts-ignore
import Background from '../../assets/img/background-chat-vk-75.jpg';

const Home = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {dialogs, currentDialog} = useAppSelector(state => state.dialogs)
    const {messages} = useAppSelector(state => state.messages)
    const {convid} = currentDialog

    useEffect(() => {
        if (location) {
            const dialogId = location.hash.split('#').pop();
            const dialog = dialogs.find((dialog: dialogItem) => dialog.convid === Number(dialogId))
            if (dialog) {
                dispatch(messagesAction.fetchMessages(dialog.userid))
                dispatch(setCurrentDialog(dialog))
            }
        }
    }, [location]);

    const messagesRef = useRef<any>(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo(0, 999999);
        }
    }, [messages]);

    return (
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
                                <ChatInput/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;