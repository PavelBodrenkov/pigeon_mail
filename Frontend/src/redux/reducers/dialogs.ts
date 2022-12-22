import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {dialogItem} from '../../types/dialogTypes';
import {fetchDialogs} from "@redux/actions";

interface initialState {
    dialogs:dialogItem[],
    dialog:dialogItem,
    currentDialog:dialogItem,
    partner:number,
    isLoadingDialogs:boolean,
    errorDialogs:{
        message:string,
        status:number
    },
    isLoadingDialog:boolean,
    errorDialog:{
        message:string,
        status:number
    },
    infoPartner:boolean
}

const initialState:initialState = {
    dialogs:[] as dialogItem[],
    dialog:{} as dialogItem,
    currentDialog:{} as dialogItem,
    partner:0,
    isLoadingDialogs:false,
    errorDialogs:{
        message:'',
        status:0
    },
    isLoadingDialog:false,
    errorDialog:{
        message:'',
        status:0
    },
    infoPartner: false
}

const dialogsSlice = createSlice( {
    name:'dialogs',
    initialState,
    reducers: {
        setCurrentDialog(state, action) {
            state.currentDialog = action.payload
        },
        setInfoPartner(state, action) {
            state.infoPartner = action.payload
        },
        setDialogs(state, action) {
            state.dialogs = action.payload
        }
    },
    extraReducers: {
        [fetchDialogs.fetchDialogs.fulfilled.type]: (state, action:PayloadAction<dialogItem[]>) => {
            state.isLoadingDialogs = false;
            state.errorDialogs = {
                message:'',
                status:0
            };
            state.dialogs = action.payload
        },
        [fetchDialogs.fetchDialogs.pending.type]: (state) => {
            state.isLoadingDialogs = true
        },
        [fetchDialogs.fetchDialogs.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingDialogs = false;
            state.errorDialogs = {
                message:action.payload.message,
                status:action.payload.status
            }
        },

        [fetchDialogs.createDialog.fulfilled.type]: (state, action:PayloadAction<dialogItem>) => {
            state.isLoadingDialog = false;
            state.errorDialog = {
                message:'',
                status:0
            }
            // state.dialogs.push(action.payload)
        },
        [fetchDialogs.createDialog.pending.type]: (state) => {
            state.isLoadingDialog = false;
        },
        [fetchDialogs.createDialog.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingDialog = false;
            state.errorDialog = {
                message:action.payload.message,
                status:action.payload.status
            }
        },
    }
})

export default dialogsSlice.reducer
export const {setCurrentDialog, setInfoPartner, setDialogs} = dialogsSlice.actions
