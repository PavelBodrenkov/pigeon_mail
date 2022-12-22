import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "@redux/actions";
import {IUser} from "@utils/api/models/IUser";

interface initialState {
    users:IUser[],
    online_users:{[x:number]: number},
    isLoadingUsers:boolean,
    errorUsers:{
        message:string,
        status:number
    }
}

const initialState:initialState = {
    users:[] as IUser[],
    online_users:{},
    isLoadingUsers:false,
    errorUsers:{
        message:'',
        status:0
    },
}

const usersSlice = createSlice( {
    name:'users',
    initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.online_users = action.payload
        }
    },
    extraReducers: {
        [fetchUsers.fetchUsers.fulfilled.type]: (state, action:PayloadAction<IUser[]>) => {
            state.isLoadingUsers = false;
            state.errorUsers =  {
                message:'',
                status:0
            };
            state.users = action.payload;
        },
        [fetchUsers.fetchUsers.pending.type]: (state) => {
            state.isLoadingUsers = true
        },
        [fetchUsers.fetchUsers.rejected.type]: (state, action:PayloadAction<{message:string, status:number}>) => {
            state.isLoadingUsers = false;
            state.errorUsers = {
                message:action.payload.message,
                status:action.payload.status
            };
        },
    }
})

export default usersSlice.reducer
export const {setOnlineUsers} = usersSlice.actions
