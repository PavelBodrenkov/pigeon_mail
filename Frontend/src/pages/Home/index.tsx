import React, { useEffect} from 'react';
import { ChatInput, SideBar} from "@components/index";
import { Messages, Status} from "@containers/index";
import './Home.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useLocation} from "react-router-dom";
import {setCurrentDialog} from "@redux/reducers/dialogs";

const Home = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.users)
    const {currentDialog} = useAppSelector(state => state.dialogs)

    useEffect(() => {
        if (location) {
            const dialogId = location.hash.split('#').pop();
            dispatch(setCurrentDialog(dialogId))
        }
    }, [location]);

    return (
        <section className={'home'}>
            <div className={'chat'}>
                <SideBar />
                {currentDialog > 0 &&
                    <div className={'chat__dialog'}>
                        <Status />
                        <div className={'chat__dialog-messages'}>
                            <Messages items={[]}/>
                        </div>
                        <div className={'chat__dialog-input'}>
                            <ChatInput/>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default Home;