import axios from 'axios';

export default {
    // user routes
    registerLogin: function (userData) {
        return axios.post('/api/auth/register_login', userData);
    },
    googleSignin: function () {
        return axios.get('/api/auth/google');
    }
}