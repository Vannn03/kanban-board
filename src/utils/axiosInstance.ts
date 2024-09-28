import axios from 'axios'

const axiosInstance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Authorization': `${import.meta.env.VITE_BEARER_TOKEN}` },
})

export default axiosInstance