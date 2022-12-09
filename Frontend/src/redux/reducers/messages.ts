import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {messagesAction} from "@redux/actions";

interface initialState {
    messages:any[],
    isLoading:boolean,
    error:string
}

const initialState:initialState = {
    messages:[],
    isLoading:false,
    error:''
}

const messagesSlice = createSlice( {
    name:'dialogs',
    initialState,
    reducers: {
    },
    extraReducers: {
        [messagesAction.fetchMessages.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.messages = action.payload
        },
        [messagesAction.fetchMessages.pending.type]: (state) => {
            state.isLoading = true
        },
        [messagesAction.fetchMessages.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [messagesAction.sendMessage.fulfilled.type]:(state, action) => {
            state.messages.push(action.payload)
            state.isLoading = false;
            state.error = '';
        },
        [messagesAction.sendMessage.pending.type]: (state) => {
            state.isLoading = true
        },
        [messagesAction.sendMessage.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default messagesSlice.reducer
// export const {setCurrentDialog} = messagesSlice.actions
