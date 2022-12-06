import {apiDialogs, apiMessages} from './../../utils/api/index';

import {createAsyncThunk} from "@reduxjs/toolkit";

const fetchMessages = createAsyncThunk(
    'messages/fetchAll',
    async (id:number, thunkAPI) => {
        try {
            const response = await apiMessages.getAllByDialogId(id)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка загрузки сообщений')
        }
    }
)



export default fetchMessages