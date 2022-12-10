import {apiDialogs} from './../../utils/api/index';

import {createAsyncThunk} from "@reduxjs/toolkit";
import DialogsApi from "@utils/api/dialogs";

interface data {
    owner:number,
    partner:number,
    message:string
}

const fetchDialogs = createAsyncThunk(
    'dialogs/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await DialogsApi.getDialogs()
            return response.data
        } catch (e:any) {
            return thunkAPI.rejectWithValue({
                message:e.response.data.message,
                status:e.response.status
            })
        }
    }
)

const createDialog = createAsyncThunk(
    'dialogs/create',
    async (data:data, thunkAPI) => {
        try {
            const response = await DialogsApi.createDialog(data.owner, data.partner, data.message)
            return response.data
        } catch (e:any) {
            return thunkAPI.rejectWithValue({
                message:e.response.data.message,
                status:e.response.status
            })
        }
    }
)



export default {
    fetchDialogs,
    createDialog
}