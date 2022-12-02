import React, {FC} from 'react';
import './Auth.scss';
import {LoginForm, RegisterForm} from "../../modules";
import {Route, Routes} from "react-router-dom";

const Auth: FC = () => {
    return (
        <section className={'auth'}>
            <div className={'auth__content'}>
              <Routes>
                  <Route path={'login'} element={<LoginForm/>}/>
                  <Route path={'register'} element={<RegisterForm/>}/>
              </Routes>
            </div>
        </section>
    );
};

export default Auth;