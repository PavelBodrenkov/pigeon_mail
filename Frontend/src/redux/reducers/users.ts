import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {dialogItem} from '../../types/dialogTypes';
import {auth} from "@redux/actions";
import {IUser} from "@utils/api/models/IUser";

interface initialState {
    user:IUser | {},
    isAuth:boolean,
    isLoading:boolean,
    error:string
}

const initialState:initialState = {
    user:{},
    isAuth:false,
    isLoading:true,
    error:''
}

const usersSlice = createSlice( {
    name:'users',
    initialState,
    reducers: {
    },
    extraReducers: {
        [auth.fetchLogin.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload
        },
        [auth.fetchLogin.pending.type]: (state) => {
            state.isLoading = true
        },
        [auth.fetchLogin.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [auth.fetchRegister.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload
        },
        [auth.fetchRegister.pending.type]: (state) => {
            state.isLoading = true
        },
        [auth.fetchRegister.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default usersSlice.reducer
//export const {setUser, setAuth, setError} = messagesSlice.actions
