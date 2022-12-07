import dialogs from "./dialogs";
import messages from './messages'
import {combineReducers} from "@reduxjs/toolkit";
import users from "@redux/reducers/users";

export default combineReducers({
    dialogs,
    messages,
    users
})

