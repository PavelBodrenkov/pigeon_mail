import {apiDialogs, apiMessages} from './../../utils/api/index';

import {createAsyncThunk} from "@reduxjs/toolkit";
import MessagesApi from "@utils/api/messages";

interface dataProps {
    conv_id:number,
    message:string,
    partner:number
}

const fetchMessages = createAsyncThunk(
    'messages/fetchAll',
    async (id:number, thunkAPI) => {
        try {
            const response = await MessagesApi.getMessages(id)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка загрузки сообщений')
        }
    }
)

const sendMessage = createAsyncThunk(
    'messages/send',
    async (data:dataProps, thunkAPI) => {
        try {
            const response = await MessagesApi.sendMessage(data.conv_id, data.message, data.partner)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка отправки сообщения')
        }
    }
)



export default {
    fetchMessages,
    sendMessage
}