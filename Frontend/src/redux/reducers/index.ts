import dialogs from "./dialogs";
import messages from './messages'
import {combineReducers} from "@reduxjs/toolkit";
import users from "@redux/reducers/users";
import auth from "@redux/reducers/auth";

export default combineReducers({
    dialogs,
    messages,
    auth,
    users
})

