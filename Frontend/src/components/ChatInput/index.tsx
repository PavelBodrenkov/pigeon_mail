import React, {useState} from 'react';
import './ChatInput.scss';
import {AudioOutlined, CameraOutlined, SendOutlined, SmileOutlined} from "@ant-design/icons";
import {Input, Form} from "antd";
import {messagesAction} from "@redux/actions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setMessages} from "@redux/reducers/messages";

const ChatInput = () => {
    const { currentDialog } = useAppSelector(state => state.dialogs)
    const { user } = useAppSelector(state => state.users)
    const {sender, userid} = currentDialog
    const {id, avatar, fullname} = user

    const [value, setValue] = useState('')
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const sendMessage = (e):void => {
        e.stopPropagation()
        const data = {
            conv_id:currentDialog.convid || 0,
            message:value,
            partner:id === sender ? userid : sender
        }
        dispatch(messagesAction.sendMessage(data))
        // dispatch(setMessages({
        //         avatar,
        //         date:new Date(),
        //         fullname,
        //
        // }))
        form.setFieldsValue({
            message: ''
        });
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