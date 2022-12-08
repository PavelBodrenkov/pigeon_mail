import React, {useState} from 'react';
import {Message, Status, ChatInput, HoverButton} from "@components/index";
import {Dialogs, Messages} from "@containers/index";
import './Home.scss';
import {Button, Drawer, Image, Input, Popover, Space} from "antd";
import {
    TeamOutlined,
    FormOutlined,
    SearchOutlined,
    EllipsisOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {auth} from "@redux/actions";
import {SidebarHeader} from '@components/index'


const Home = () => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.users)

    const logout = () => {
        dispatch(auth.fetchLogout())
    }
    const [open, setOpen] = useState(false)

    const onClose = () => {
        setOpen(false);
    };
    const openDrawer = () => {
        setOpen(true);
    };

    return (
        <section className={'home'}>
            <div className={'chat'}>
                <div className={'chat__sidebar'}>
                    <Drawer
                        title={
                            <div
                                className={'chat__sidebar-header'}
                                style={{marginBottom:0, borderBottom:0, height:57}}
                            >
                               <HoverButton onClick={onClose}>
                                   <ArrowLeftOutlined/>
                               </HoverButton>
                               <span>Настройки</span>
                           </div>
                        }
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        open={open}
                        getContainer={false}
                        width={319}
                        style={{boxShadow: 'none'}}
                    >
                        <div>
                            <Image
                                // src={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                                src="error"
                                fallback={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                            />
                            <button onClick={logout}>Выход</button>

                        </div>
                    </Drawer>
                    <SidebarHeader
                        openDrawer={openDrawer}
                    />
                    <div className={'chat__sidebar-search'}>
                        <Input
                            placeholder={'Поиск по списку диалогов'}
                            prefix={<SearchOutlined className="site-form-item-icon"/>}/>
                    </div>
                    <div className={'chat__sidebar-dialogs'}>
                        <Dialogs
                            ownerId={1}
                            items={[
                                {
                                    id: 1,
                                    text: 'Я создал',
                                    isReaded: true,
                                    created_at: new Date('Fri Dec 02 2022 13:36:20'),
                                    user: {
                                        id: 1,
                                        isOnline: false,
                                        fullname: 'Pavel',
                                        avatar: 'https://mediasole.ru/data/images/412/412388/23stunning-landscape-view-argentina.jpg'
                                    },
                                    unreaded: 0
                                },
                                {
                                    id: 2,
                                    text: 'Я создал',
                                    isReaded: true,
                                    created_at: new Date('Fri Dec 02 2022 13:36:20'),
                                    user: {
                                        id: 2,
                                        isOnline: true,
                                        fullname: 'Pavel',
                                        avatar: 'https://mediasole.ru/data/images/412/412388/23stunning-landscape-view-argentina.jpg'
                                    },
                                    unreaded: 0
                                },

                            ]}
                        />
                    </div>
                </div>
                <div className={'chat__dialog'}>
                    <div className={'chat__dialog-header'}>
                        <div/>
                        <div className={'chat__dialog-header-center'}>
                            <b className={'chat__dialog-header-username'}>{user.fullname}</b>
                            <div className={'chat__dialog-header-status'}>
                                <Status online={true}/>
                            </div>
                        </div>
                        <EllipsisOutlined style={{fontSize: 22}}/>
                    </div>
                    <div className={'chat__dialog-messages'}>
                        <Messages items={[]}/>
                        {/*<Message*/}
                        {/*    avatar={'https://mediasole.ru/data/images/412/412388/23stunning-landscape-view-argentina.jpg'}*/}
                        {/*    // text={'Hello'}*/}
                        {/*    date={'Thu Dec 01 2022 16:20:07'}*/}
                        {/*    user={{}}*/}
                        {/*    isTyping={false}*/}
                        {/*    // isMe={false}*/}
                        {/*    // isReaded={true}*/}
                        {/*    attachments={[*/}
                        {/*        {*/}
                        {/*            id:1,*/}
                        {/*            filename: 'test',*/}
                        {/*            url: 'https://mediasole.ru/data/images/412/412388/23stunning-landscape-view-argentina.jpg'*/}
                        {/*        }*/}
                        {/*    ]}*/}
                        {/*/>*/}
                        {/*<Message*/}
                        {/*    avatar={'https://mediasole.ru/data/images/412/412388/23stunning-landscape-view-argentina.jpg'}*/}
                        {/*    text={'Hello'}*/}
                        {/*    date={'Thu Dec 01 2022 16:20:07'}*/}
                        {/*    user={{}}*/}
                        {/*    isMe={true}*/}
                        {/*    isReaded={true}*/}
                        {/*/>*/}
                    </div>
                    <div className={'chat__dialog-input'}>
                        <ChatInput/>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Home;