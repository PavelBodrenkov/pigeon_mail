import React, {FC} from 'react';
import './Auth.scss';
import {LoginForm, RegisterForm} from "../../modules";
import {Route, Routes} from "react-router-dom";

const Auth: FC<{ type: string }> = ({type}) => {
    return (
        <section className={'auth'}>
            <div className={'auth__content'}>
                {type === '/login' ?
                    <LoginForm/>
                    :
                    <RegisterForm/>
                }
            </div>
        </section>
    );
};

export default Auth;