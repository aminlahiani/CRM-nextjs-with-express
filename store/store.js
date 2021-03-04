import { combineReducers, createStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import currentUserReducer from "./currentUser/currentUserSlice";


const combinedReducers = combineReducers({
    currentUser: currentUserReducer
})

const rootReducer = (state, action) => {
    if(action.type === HYDRATE) {
        const nextState = {
            ...state, 
            ...action.payload
        }
        return nextState
    }else {
        return combinedReducers(state,action)
    }
    
}

const initStore = () => createStore(rootReducer)

const wrapper = createWrapper(initStore)

export default  wrapper



