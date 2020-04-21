/*
 * @Description: login
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-10-25 09:45:55
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 14:38:39
 */
import axios from '@/plugin/axios'

let login = {
  AccountLogin (data) {
    return axios.post('/login', data)
  }
}
export default login
