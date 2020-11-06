import axios from 'axios'





//登录接口
export const login =(params)=>axios.post('/user/login',params);