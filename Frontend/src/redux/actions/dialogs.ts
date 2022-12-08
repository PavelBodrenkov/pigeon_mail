import {apiDialogs} from './../../utils/api/index';

import {createAsyncThunk} from "@reduxjs/toolkit";
import DialogsApi from "@utils/api/dialogs";

const fetchDialogs = createAsyncThunk(
    'dialogs/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await DialogsApi.getDialogs()
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка загрузки диалогов')
        }
    }
)



export default fetchDialogs