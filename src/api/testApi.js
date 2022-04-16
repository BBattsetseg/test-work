import axios from 'axios'

const BaseUrl = axios.create({
    baseURL:'http://localhost:3001'
})

export default BaseUrl