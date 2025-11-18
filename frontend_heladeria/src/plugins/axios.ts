// import Axios from 'axios'

// const axios = Axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
//   headers: {
//     'Content-type': 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NzM1NTk5MCwiZXhwIjoxNzQ3MzU2MDUwfQ.cTzT_JqypirpundzZ5-irAPrBaN8EN_cg5sA24w6dPA',
//   },
// })

// export default axios
import Axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/index'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT
})

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (config.headers) {
    config.headers['Content-type'] = 'application/json'
    config.headers['Authorization'] = 'Bearer ' + authStore.token
  }
  return config
})

export default axios
