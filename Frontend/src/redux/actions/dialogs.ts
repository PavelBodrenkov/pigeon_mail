import {apiDialogs} from './../../utils/api/index';

import {createAsyncThunk} from "@reduxjs/toolkit";

const fetchDialogs = createAsyncThunk(
    'dialogs/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await apiDialogs.getAll()
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка загрузки диалогов')
        }
    }
)



export default fetchDialogs