import Axios from 'axios';
import config from './config/config.development';

const api = Axios.create({
    baseURL: config.API_URL
});

let _store;
api._setStore = (store) => {
    _store = store;
};

export default api;
