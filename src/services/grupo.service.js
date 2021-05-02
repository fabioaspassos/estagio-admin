import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/grupo`;

const copyGrupo = async (grupo) => {
    return await axios.post(`${base_url}/${grupo.id}/duplicate`).then((res) => {
        return res;
    }, (err) => {
        return Promise.reject(err);
    });
}

const createGrupo = async (grupo) => {
    return await axios.post(`${base_url}`, grupo).then((res) => {
        return res;
    }, (err) => {
        return Promise.reject(err);
    });
}

const updateGrupo = async (grupo) => {
    return await axios.put(`${base_url}`, grupo).then((res) => {
        return res;
    }, (err) => {
        return Promise.reject(err);
    });
}

export {copyGrupo, createGrupo, updateGrupo};