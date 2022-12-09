import React, {FC} from 'react';
import './Auth.scss';
import {LoginForm, RegisterForm} from "../../modules";
import {Route, Routes} from "react-router-dom";
// @ts-ignore
import background from './../../assets/img/1612799559_55-p-golubi-na-golubom-fone-68.jpg'

const Auth: FC<{ type: string }> = ({type}) => {
    return (
        <section className={'auth'} style={{backgroundImage:`url(${background})`, backgroundSize:'cover'}}>
            <h1 style={{position:'absolute', top:'10%', left:'50%', transform:'translate(-50%, -50%)', fontSize:'50px'}}>
                Pigeon Mail
            </h1>
            <div className={'auth__content'} >
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