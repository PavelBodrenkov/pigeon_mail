import rootReducer from './reducers';
import {configureStore} from "@reduxjs/toolkit";

export const store = () =>  {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']