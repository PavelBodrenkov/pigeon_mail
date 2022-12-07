import AuthApi from '@utils/api/auth';

import {createAsyncThunk} from "@reduxjs/toolkit";

interface loginProps {
    email:string,
    password:string
}

interface registerProps {
    fullname:string
    email:string,
    password:string
}

const fetchLogin = createAsyncThunk(
    'login/fetch',
    async (data:loginProps, thunkAPI) => {
        console.log('data', data)
        try {
            const response = await AuthApi.login(data.email, data.password)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка авторизации')
        }
    }
)

const fetchRegister = createAsyncThunk(
    'register/fetch',
    async (data:registerProps, thunkAPI) => {
        console.log('data', data)
        try {
            const response = await AuthApi.registration(data.fullname, data.email, data.password)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка регистрации')
        }
    }
)



export default {
    fetchLogin,
    fetchRegister
}