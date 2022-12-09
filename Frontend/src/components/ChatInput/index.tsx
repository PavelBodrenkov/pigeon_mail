import React, {useState} from 'react';
import './ChatInput.scss';
import {AudioOutlined, CameraOutlined, SendOutlined, SmileOutlined} from "@ant-design/icons";
import {Input, Form} from "antd";
import {messagesAction} from "@redux/actions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const ChatInput = () => {
    const { currentDialog } = useAppSelector(state => state.dialogs)
    const { user } = useAppSelector(state => state.users)
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch();
    console.log('currentDialog', currentDialog)

    const sendMessage = (e):void => {
        e.stopPropagation()
        console.log('value', value)
        const data = {
            conv_id:currentDialog || 0,
            message:value,
            partner:19
        }
        dispatch(messagesAction.sendMessage(data))
    }

    return (
        <div className={'chat-input'}>
            <Form
                name="basic"
                onValuesChange={(_changedValue, allValues) => {
                    setValue(_changedValue.message)
                }}
            >
                <Form.Item
                    name={'message'}
                    noStyle
                >
                    <Input
                        prefix={<SmileOutlined />}
                        suffix={
                            <div>
                                <CameraOutlined style={{ marginRight:5 }}/>
                                <AudioOutlined style={{ marginRight:5}}/>
                                <SendOutlined  onClick={(e) => sendMessage(e)}/>
                            </div>
                        }
                        placeholder={'Введите текст сообщения'}
                        size={'large'}
                    />
                </Form.Item>
            </Form>

        </div>
    );
};

export default ChatInput;