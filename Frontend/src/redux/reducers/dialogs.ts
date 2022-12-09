import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {dialogItem} from '../../types/dialogTypes';
import {fetchDialogs} from "@redux/actions";

interface initialState {
    dialogs:dialogItem[],
    currentDialog:dialogItem,
    partner:number,
    isLoading:boolean,
    error:string
}

const initialState:initialState = {
    dialogs:[],
    currentDialog:{} as dialogItem,
    partner:0,
    isLoading:false,
    error:''
}

const dialogsSlice = createSlice( {
    name:'dialogs',
    initialState,
    reducers: {
        setCurrentDialog(state, action) {
            state.currentDialog = action.payload
        },
    },
    extraReducers: {
        [fetchDialogs.fulfilled.type]: (state, action:PayloadAction<dialogItem[]>) => {
            state.isLoading = false;
            state.error = '';
            state.dialogs = action.payload
        },
        [fetchDialogs.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchDialogs.rejected.type]: (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export default dialogsSlice.reducer
export const {setCurrentDialog} = dialogsSlice.actions
