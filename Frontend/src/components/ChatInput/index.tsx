import React from 'react';
import './ChatInput.scss';
import {AudioOutlined, CameraOutlined, SendOutlined, SmileOutlined} from "@ant-design/icons";
import {Input} from "antd";

const ChatInput = () => {

    const click = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={'chat-input'}>
            {/*<div className={'chat-input__smile-btn'}>*/}
            {/*    <SmileOutlined style={{ color: 'rgba(0,0,0,.7)' }}/>*/}
            {/*</div>*/}
            <Input
                prefix={<SmileOutlined onClick={(e) => click(e)}/>}
                suffix={
                    <div>
                        <CameraOutlined style={{ marginRight:5 }}/>
                        <AudioOutlined style={{ marginRight:5}}/>
                        <SendOutlined />
                    </div>
                }
                placeholder={'Введите текст сообщения'}
                size={'large'}
            />
        </div>
    );
};

export default ChatInput;