import axios from 'axios';

export default {
    // user routes
    registerLogin: function(userData) {
        return axios.post('/api/auth/register_login', userData);
    }
}