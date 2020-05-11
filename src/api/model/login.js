import axios from '@/plugin/axios';
let login = {
  AccountLogin(data) {
    return axios.post('/media/auth/user/login', {
      appId: process.env.VUE_APP_USER_APPID,
      data,
    });
  },
  AccountMenu(data) {
    return axios.post('/media/auth/permission/getMenuByUser', {
      data: {
        appId: process.env.VUE_APP_USER_APPID,
        ...data,
      },
    });
  },
};
export default login;
