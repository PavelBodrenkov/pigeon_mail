import React, {useEffect} from 'react';
import {Alert, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Block} from "@components/index";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {auth} from "@redux/actions";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {isLoadingLogin, errorLogin} = useAppSelector(state => state.auth)

    const onLoginSubmit = (values: any) => {
        dispatch(auth.fetchLogin(values))
    };

    return (
        <>
            <div className={'auth__top'}>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                {errorLogin.message && (
                    <div className={'alert'}>
                        <Alert
                            message={errorLogin.message}
                            type="error"
                            description={
                                errorLogin.status === 500
                                    ? 'Попробуйте позднее или обратитесь в поддержку'
                                    : ''
                            }
                            showIcon
                        />
                    </div>
                )}
                <Form
                    name="login"
                    onFinish={onLoginSubmit}
                    initialValues={{remember: true}}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {required: true, message: 'Обязательное поле'},
                            {type: 'email', warningOnly: true, message: 'некорректный email'},
                            {type: 'string'}]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder={'Email'}
                            size={'large'}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {required: true, message: 'Обязательное поле'},
                            {type: 'string', min: 6, message: 'минимум 6 символов'}
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder={'Пароль'}
                            size={'large'}
                            type={'password'}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type={'primary'}
                            size={'large'}
                            htmlType="submit"
                            loading={isLoadingLogin}
                        >
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Form.Item noStyle>
                        <Link to={'/register'} className={'auth__register-link'}>
                            Зарегистрироваться
                        </Link>
                    </Form.Item>
                </Form>
            </Block>
        </>
    );
};

export default LoginForm;