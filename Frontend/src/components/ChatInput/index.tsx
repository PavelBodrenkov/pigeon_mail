import React, {useRef, useState} from 'react';
import './ChatInput.scss';
import {AudioOutlined, CameraOutlined, SendOutlined, SmileOutlined} from "@ant-design/icons";
import {Input, Form} from "antd";
import {messagesAction} from "@redux/actions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setMessages} from "@redux/reducers/messages";
import socket from "@utils/socket/socket";

const ChatInput = () => {
    const { currentDialog } = useAppSelector(state => state.dialogs)
    const { user } = useAppSelector(state => state.auth)
    const {sender, userid} = currentDialog
    const {id, avatar, fullname} = user

    const [value, setValue] = useState<string>('')
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const sendMessage = (e):void => {
        e.stopPropagation()
        if(value !== '') {
            const data = {
                conv_id:currentDialog.convid || 0,
                message:value,
                partner:id === sender ? userid : sender,
                sender_id:user.id
            }
            // dispatch(messagesAction.sendMessage(data))
            form.setFieldsValue({
                message: ''
            });
            socket.emit('chatMessage', data);
        }
    }

    return (
        <div className={'chat-input'}>
            <Form
                name="basic"
                form={form}
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