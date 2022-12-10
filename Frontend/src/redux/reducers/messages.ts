import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {messagesAction} from "@redux/actions";

interface initialState {
    messages:any[],
    isLoadingGetMessage:boolean,
    isLoadingSaveMessage:boolean,
    isLoadingDeleteMessage:boolean
    errorGetMessage:{
        message:string,
        status:number
    }
    errorSaveMessage:{
        message:string,
        status:number
    }
    errorDeleteMessage:{
        message:string,
        status:number
    }
}

const initialState:initialState = {
    messages:[],
    isLoadingGetMessage:false,
    isLoadingSaveMessage:false,
    isLoadingDeleteMessage:false,
    errorGetMessage:{
        message:'',
        status:0
    },
    errorSaveMessage:{
        message:'',
        status:0
    },
    errorDeleteMessage:{
        message:'',
        status:0
    },
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
            state.isLoadingGetMessage = false;
            state.errorGetMessage ={
                message:'',
                status:0
            };
            state.messages = action.payload
        },
        [messagesAction.fetchMessages.pending.type]: (state) => {
            state.isLoadingGetMessage = true
        },
        [messagesAction.fetchMessages.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingGetMessage = false;
            state.errorGetMessage = {
                message:action.payload.message,
                status:action.payload.status
            }
        },
        [messagesAction.sendMessage.fulfilled.type]:(state, action) => {
            state.messages.push(action.payload)
            state.isLoadingSaveMessage = false;
            state.errorSaveMessage = {
                message:'',
                status:0
            };
        },
        [messagesAction.sendMessage.pending.type]: (state) => {
            state.isLoadingSaveMessage = true
        },
        [messagesAction.sendMessage.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingSaveMessage = false;
            state.errorSaveMessage = {
                message:action.payload.message,
                status:action.payload.status
            }
        },

        [messagesAction.deleteMessage.fulfilled.type]:(state, action) => {
            console.log('action.payload', action.payload)
            state.messages = state.messages.filter((item) => item.id !== action.payload.id)
            state.isLoadingSaveMessage = false;
            state.errorDeleteMessage = {
                message:'',
                status:0
            };
        },
        [messagesAction.deleteMessage.pending.type]: (state) => {
            state.isLoadingSaveMessage = true
        },
        [messagesAction.deleteMessage.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingSaveMessage = false;
            state.errorDeleteMessage = {
                message:action.payload.message,
                status:action.payload.status
            }
        },
    }
})

export default messagesSlice.reducer
export const {setMessages} = messagesSlice.actions
