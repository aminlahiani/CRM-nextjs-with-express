import { createSlice } from '@reduxjs/toolkit' 


const initialState = {
    loading: false,
    currentUser: null,
    errors: null
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        currenUserStart(state) {
            state.loading = true
        },
        currentUserSuccess(state, action) {
            state.currentUser = action.payload
            state.loading = false
        },
        currentUserFailure(state, action) {
            state.errors = action.payload
            state.loading = false
        },
        loginStart(state) {
            state.loading = true
        },
        loginSuccess(state, action) {
            state.currentUser = action.payload
            state.loading = false
        },
        loginFailure(state, action) {
            state.errors = action.payload
            state.loading = false
        },
        logoutStart(state) {
            state.loading = true
        },
        logoutSuccess(state, action) {
            state.loading = false
            state.currentUser = action.payload
        },
        logoutFailure(state, action) {
            state.loading = false
            state.errors = action.payload
        }
    }
})

export const { 
    currenUserStart, 
    currentUserFailure, 
    currentUserSuccess,
    loginFailure,
    loginStart, 
    loginSuccess,
    logoutFailure, 
    logoutStart,
    logoutSuccess 
} = currentUserSlice.actions

export default currentUserSlice.reducer