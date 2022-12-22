import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {auth} from "@redux/actions";
import {IUser} from "@utils/api/models/IUser";
import socket from "@utils/socket/socket";

interface initialState {
    user:IUser,
    isAuth:boolean,
    isLoadingLogin:boolean,
    isLoadingRegister:boolean,
    isLoadingLogout:boolean,
    isLoadingRefresh:boolean,
    errorLogin:{
        message:string,
        status:number
    },
    errorRegister:{
        message:string,
        status:number
    },
    errorLogout:string,
    errorRefresh:string,
}

const initialState:initialState = {
    user:{} as IUser,
    isAuth:false,
    isLoadingLogin:false,
    isLoadingRegister:false,
    isLoadingLogout:false,
    isLoadingRefresh:false,
    errorLogin:{
        message:'',
        status:0
    },
    errorRegister:{
        message:'',
        status:0
    },
    errorLogout:'',
    errorRefresh:'',
}

const authSlice = createSlice( {
    name:'auth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [auth.fetchLogin.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.isLoadingLogin = false;
            state.errorLogin =  {
                message:'',
                status:0
            };
            state.user = action.payload;
            state.isAuth = true
        },
        [auth.fetchLogin.pending.type]: (state) => {
            state.isLoadingLogin = true
        },
        [auth.fetchLogin.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingLogin = false;
            state.isAuth = false;
            state.errorLogin = {
                message:action.payload.message,
                status:action.payload.status
            };
        },

        [auth.fetchRegister.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.isLoadingRegister = false;
            state.errorRegister = {
                message:'',
                status:0
            };
            state.user = action.payload
            state.isAuth = true
        },
        [auth.fetchRegister.pending.type]: (state) => {
            state.isLoadingRegister = true
        },
        [auth.fetchRegister.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingRegister = false;
            state.errorRegister = {
                message:action.payload.message,
                status:action.payload.status
            }
            state.isAuth = false;
        },

        [auth.fetchLogout.fulfilled.type]: (state) => {
            state.isLoadingLogout = false
            state.errorLogout = '';
            state.user = {} as IUser;
            state.isAuth = false
        },
        [auth.fetchLogout.pending.type]: (state) => {
            state.isLoadingLogout = true
        },
        [auth.fetchLogout.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoadingLogout = false
            state.errorLogout = action.payload
            state.isAuth = false;
        },

        [auth.fetchCheckAuth.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.isLoadingRefresh = false;
            state.errorRefresh = '';
            state.user = action.payload;
            state.isAuth = true
        },
        [auth.fetchCheckAuth.pending.type]: (state) => {
            state.isLoadingRefresh = true
        },
        [auth.fetchCheckAuth.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoadingRefresh = false;
            state.errorRefresh = action.payload
            state.isAuth = false;
        },

    }
})

export default authSlice.reducer
//export const {setUser, setAuth, setError} = messagesSlice.actions
