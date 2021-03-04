import axios from "../../utils/axios"
import { currentUserFailure, currentUserSuccess, currenUserStart, loginFailure, loginStart, loginSuccess } from "./currentUserSlice"


export const getCurrentUser = () => async dispatch => {
    dispatch(currenUserStart())
    const {data} = await axios.get('/users/me')
    if(data.isOK) {
        dispatch(currentUserSuccess(data.data))
    }else {
        dispatch(currentUserFailure(data.errors))
    }
}


export const login = ({email, password}) => async dispatch => {
    dispatch(loginStart())
    const {data} = await axios.post('/admin/login', {email, password})
    if(data.isOK) {
        dispatch(loginSuccess(data.data))
    }else {
        dispatch(loginFailure(data.errors))
    }
}

export const logout = () => async dispatch => {
    dispatch(loginStart())
    const {data} = await axios.post('/admin/logout', {})
    if(data.isOK) {
        dispatch(loginSuccess(data.data))
    }else {
        dispatch(loginFailure(data.errors))
    }
}