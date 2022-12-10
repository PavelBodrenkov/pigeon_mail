import React, {useState} from 'react';
import {Alert, Form, Input} from "antd";
import {LockOutlined, UserOutlined, MailOutlined, ExclamationCircleTwoTone} from "@ant-design/icons";
import {Button, Block} from "@components/index";
import {Link} from "react-router-dom";
import {auth} from "@redux/actions";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

const RegisterForm = () => {
    const [validationConfirm, setValidationConfirm] = useState<any>('success')
    const dispatch = useAppDispatch();
    const { isLoadingRegister, errorRegister } = useAppSelector(state => state.users)

    const success = false

    const onRegisterSubmit = (values: any) => {
        if(values.password === values.confirmpassword) {
            dispatch(auth.fetchRegister(values))
        } else {
            setValidationConfirm('error')
        }
    };

    return (
        <>
            <div className={'auth__top'}>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {errorRegister.message && (
                    <div className={'alert'}>
                        <Alert
                            message={errorRegister.message}
                            type="error"
                            description={
                                errorRegister.status === 500
                                    ? 'Попробуйте позднее или обратитесь в поддержку'
                                    : ''
                            }
                            showIcon
                        />
                    </div>
                )}
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
                            validateStatus={validationConfirm}
                            rules={[{required: true, message: 'Обязательное поле'}]}
                            help={validationConfirm === 'error' ? "Пароли е совпадают" : ''}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                placeholder={'Повторите пароль'}
                                size={'large'}
                                type={'password'}/>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type={'primary'}
                                size={'large'}
                                htmlType="submit"
                                loading={isLoadingRegister}
                            >
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