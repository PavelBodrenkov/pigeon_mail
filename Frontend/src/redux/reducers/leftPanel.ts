import {createSlice} from "@reduxjs/toolkit";

interface initialStateProps {
    pane:string
}

const initialState:initialStateProps = {
    pane:'chat'
}

const leftPaneSlice = createSlice( {
    name:'messages',
    initialState,
    reducers: {
        setPane(state, action) {
            state.pane = action.payload
        }
    },
})

export default leftPaneSlice.reducer
export const {setPane} = leftPaneSlice.actions
