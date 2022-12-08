import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {auth} from "@redux/actions";
import {IUser} from "@utils/api/models/IUser";

interface initialState {
    user:IUser,
    isAuth:boolean,
    isLoadingLogin:boolean,
    isLoadingRegister:boolean,
    isLoadingLogout:boolean,
    isLoadingRefresh:boolean,
    errorLogin:string,
    errorRegister:string,
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
    errorLogin:'',
    errorRegister:'',
    errorLogout:'',
    errorRefresh:'',
}

const usersSlice = createSlice( {
    name:'users',
    initialState,
    reducers: {
    },
    extraReducers: {
        [auth.fetchLogin.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.isLoadingLogin = false;
            state.errorLogin = '';
            state.user = action.payload;
            state.isAuth = true
        },
        [auth.fetchLogin.pending.type]: (state) => {
            state.isLoadingLogin = true
        },
        [auth.fetchLogin.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoadingLogin = false;
            state.isAuth = false;
            state.errorLogin = action.payload
        },

        [auth.fetchRegister.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.isLoadingRegister = false;
            state.errorRegister = '';
            state.user = action.payload
            state.isAuth = true
        },
        [auth.fetchRegister.pending.type]: (state) => {
            state.isLoadingRegister = true
        },
        [auth.fetchRegister.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoadingRegister = false;
            state.errorRegister = action.payload
            state.isAuth = false;
        },

        [auth.fetchLogout.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
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

export default usersSlice.reducer
//export const {setUser, setAuth, setError} = messagesSlice.actions
