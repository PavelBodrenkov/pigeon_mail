import React, {useEffect} from 'react';
import {Button, Form, Image, Input, Space} from "antd";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {auth} from "@redux/actions";
import {setCurrentDialog} from "@redux/reducers/dialogs";
import './Profile.scss';
import {getAvatar} from "@utils/services/services";
import {setOnlineUsers} from "@redux/reducers/users";

const Profile = () => {
    const {user} = useAppSelector(state => state.auth)
    const {online_users} = useAppSelector(state => state.users)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(auth.fetchLogout())
        dispatch(setCurrentDialog({}))
        const tmp = online_users
        console.log('tmp1', tmp)
        delete tmp[user.id]
        console.log('tm2', tmp)
        // dispatch(setOnlineUsers(tmp))

    }

    useEffect(() => {
        form.setFieldsValue({
            name: user.fullname
        });
    }, [])

    return (
        <div className={'profile'}>
            <Space
                direction={'vertical'}
                size={'large'}
                className={'profile__wrapper'}
            >
                <div className={'profile__wrapper_image'}>
                    <Image
                        // src={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                        src={user.avatar === null ? 'error' : user.avatar}
                        width={'100%'}
                        fallback={'https://wallridestore.com/images/product.jpg'}
                    />
                </div>

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