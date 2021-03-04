import _axios from 'axios'

const axios = _axios.create({
    baseURL: typeof window === 'undefined' ? process.env.HOST_DEV : '/',
})

export default axios