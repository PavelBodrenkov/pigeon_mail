import React from 'react';
import {Message, Status, ChatInput} from "@components/index";
import {Dialogs, Messages} from "@containers/index";
import './Home.scss';
import {Input} from "antd";
import {
    TeamOutlined,
    FormOutlined,
    SearchOutlined,
    EllipsisOutlined,
    SmileOutlined,
    InfoCircleOutlined,
    AudioOutlined,
    SendOutlined,
    CameraOutlined
} from '@ant-design/icons';


const Home = () => {

    return (
        <section className={'home'}>
            <div className={'chat'}>
                <div className={'chat__sidebar'}>
                    <div className={'chat__sidebar-header'}>
                        <div>
                            <TeamOutlined/>
                            <span>Список диалогов</span>
                        </div>
                        <FormOutlined/>
                    </div>
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
                                    id:1,
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
                                    id:2,
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
                            <b className={'chat__dialog-header-username'}>Pavel</b>
                            <div className={'chat__dialog-header-status'}>
                                <Status online={true}/>
                            </div>
                        </div>
                        <EllipsisOutlined style={{fontSize: 22}}/>
                    </div>
                    <div className={'chat__dialog-messages'}>
                        <Messages items={[]} />
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
                        <ChatInput />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Home;