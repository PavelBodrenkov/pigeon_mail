import React from 'react';
import {Form, Input} from "antd";
import {LockOutlined, UserOutlined, MailOutlined, ExclamationCircleTwoTone} from "@ant-design/icons";
import {Button, Block} from "@components/index";
import {Link} from "react-router-dom";
import {auth} from "@redux/actions";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const { user, isLoading, error} = useAppSelector(state => state.users)
    const success = false

    console.log('user', user)

    const onRegisterSubmit = (values: any) => {
        dispatch(auth.fetchRegister(values))
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <div className={'auth__top'}>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {!success ? (
                    <Form
                        autoComplete="off"
                        name="register"
                        initialValues={{ remember: true }}
                        onFinish={onRegisterSubmit}
                    >
                        <Form.Item
                            name="email"
                            hasFeedback
                            rules={[
                                {required: true, message: 'Обязательное поле'},
                                { type: 'email', warningOnly: true, message:'некорректный email' },
                                { type: 'string'}]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon"/>}
                                placeholder={'E-Mail'}
                                size={'large'}
                            />
                        </Form.Item>
                        <Form.Item
                            name="fullname"
                            hasFeedback
                            rules={[{required: true, message: 'Обязательное поле'}]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                placeholder={'Ваше имя'}
                                size={'large'}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            hasFeedback
                            rules={[
                                {required: true, message: 'Обязательное поле'},
                                { type: 'string', min:6, message:'минимум 6 символов' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                placeholder={'Пароль'}
                                size={'large'}
                                type={'password'}/>
                        </Form.Item>
                        <Form.Item
                            name="confirmpassword"
                            rules={[{required: true, message: 'Обязательное поле'}]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                placeholder={'Повторите пароль'}
                                size={'large'}
                                type={'password'}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type={'primary'} size={'large'} htmlType="submit">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Form.Item noStyle>
                            <Link to={'/login'} className={'auth__register-link'}>
                                Войти в аккаунт
                            </Link>
                        </Form.Item>
                    </Form>
                ):(
                    <div className={'auth__success-block'}>
                        <div>
                            <ExclamationCircleTwoTone style={{fontSize:50}}/>
                        </div>
                        <h2>Подтвердите свой аккаунт</h2>
                        <p>На Вашу почту отправлено письмо с сылкой на подтверждение аккаунта</p>
                    </div>
                )}

            </Block>
        </>
    );
};

export default RegisterForm;