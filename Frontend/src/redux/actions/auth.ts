import AuthApi from '@utils/api/auth';

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AuthResponse} from "@utils/api/models/response/AuthResponse";

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
        try {
            const response = await AuthApi.login(data.email, data.password)
            localStorage.setItem('token', response.data.accessToken)
            return response.data.user
        } catch (e:any) {
            return thunkAPI.rejectWithValue({
                message:e.response.data.message,
                status:e.response.status
            })
        }
    }
)

const fetchRegister = createAsyncThunk(
    'register/fetch',
    async (data:registerProps, thunkAPI) => {
        try {
            const response = await AuthApi.registration(data.fullname, data.email, data.password)
            localStorage.setItem('token', response.data.accessToken)
            return response.data.user
        } catch (e:any) {
            return thunkAPI.rejectWithValue({
                message:e.response.data.message,
                status:e.response.status
            })
        }
    }
)

const fetchLogout = createAsyncThunk(
    'logout/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await AuthApi.logout()
            localStorage.removeItem('token')
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка при выходе')
        }
    }
)

const fetchCheckAuth = createAsyncThunk(
    'checkAuth/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<AuthResponse>('http://localhost:8080/api/refresh', {withCredentials:true})
            localStorage.setItem('token', response.data.accessToken)
            return response.data.user
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка при выходе')
        }
    }
)

export default {
    fetchLogin,
    fetchRegister,
    fetchLogout,
    fetchCheckAuth
}