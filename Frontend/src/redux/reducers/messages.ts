import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {messagesAction} from "@redux/actions";

interface initialState {
    messages:any[],
    isLoadingMessage:boolean,
    isLoadingSaveMessage:boolean,
    error:string
}

const initialState:initialState = {
    messages:[],
    isLoadingMessage:false,
    isLoadingSaveMessage:false,
    error:''
}

const messagesSlice = createSlice( {
    name:'messages',
    initialState,
    reducers: {
        setMessages(state, action) {
            state.messages.push(action.payload)
        }
    },
    extraReducers: {
        [messagesAction.fetchMessages.fulfilled.type]: (state, action) => {
            state.isLoadingMessage = false;
            state.error = '';
            state.messages = action.payload
        },
        [messagesAction.fetchMessages.pending.type]: (state) => {
            state.isLoadingMessage = true
        },
        [messagesAction.fetchMessages.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoadingMessage = false;
            state.error = action.payload
        },
        [messagesAction.sendMessage.fulfilled.type]:(state, action) => {
            state.messages.push(action.payload)
            state.isLoadingSaveMessage = false;
            state.error = '';
        },
        [messagesAction.sendMessage.pending.type]: (state) => {
            state.isLoadingSaveMessage = true
        },
        [messagesAction.sendMessage.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoadingSaveMessage = false;
            state.error = action.payload
        },
    }
})

export default messagesSlice.reducer
export const {setMessages} = messagesSlice.actions
