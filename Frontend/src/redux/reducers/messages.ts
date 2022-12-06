import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {dialogItem} from '../../types/dialogTypes';
import {fetchMessages} from "@redux/actions";

interface initialState {
    items:any[],
    isLoading:boolean,
    error:string
}

const initialState:initialState = {
    items:[],
    isLoading:false,
    error:''
}

const messagesSlice = createSlice( {
    name:'dialogs',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchMessages.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.items = action.payload
        },
        [fetchMessages.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchMessages.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export default messagesSlice.reducer
// export const {setCurrentDialog} = messagesSlice.actions
