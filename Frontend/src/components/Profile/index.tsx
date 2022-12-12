import React, {useEffect} from 'react';
import {Button, Form, Image, Input, Space} from "antd";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {auth} from "@redux/actions";
import {setCurrentDialog} from "@redux/reducers/dialogs";

const Profile = () => {
    const {user} = useAppSelector(state => state.auth)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(auth.fetchLogout())
        dispatch(setCurrentDialog({}))
    }

    useEffect(() => {
        form.setFieldsValue({
            name: user.fullname
        });
    }, [])

    return (
        <div>
            <Space direction={'vertical'} size={'large'} style={{width: '100%'}}>
                <Image
                    // src={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                    src={user.avatar === null ? 'error' : user.avatar}
                    width={'100%'}
                    fallback={'https://wallridestore.com/images/product.jpg'}
                />
                <Form form={form}>
                    <Form.Item name={'name'}>
                        <Input placeholder={'Имя'}/>
                    </Form.Item>
                    <Form.Item name={'hash'}>
                        <Input placeholder={'Хеш имя'}/>
                    </Form.Item>
                    <Button onClick={logout} type={'default'}>
                        Выход
                    </Button>
                </Form>
            </Space>

        </div>
    );
};

export default Profile;