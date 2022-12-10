import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthApi from "@utils/api/auth";
import UsersApi from "@utils/api/users";


const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await UsersApi.getUsers()
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
    fetchUsers
}