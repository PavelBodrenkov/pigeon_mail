import {apiDialogs, apiMessages} from './../../utils/api/index';

import {createAsyncThunk} from "@reduxjs/toolkit";
import MessagesApi from "@utils/api/messages";

const fetchMessages = createAsyncThunk(
    'messages/fetchAll',
    async (id:number, thunkAPI) => {
        console.log('id', id)
        try {
            const response = await MessagesApi.getMessages(id)
            console.log('response', response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка загрузки сообщений')
        }
    }
)



export default fetchMessages