import axios from 'axios';
import { server } from '../common';

const insertEscala = async (escala) => {   
    return await axios.post(`${server}/api/escala`, escala).then((res) => {
        return res;
    }, (err) => {
        return Promise.reject(err);
    });
}

const getAllEscalas = async () => {
    return await axios.get(`${server}/api/escala`).then((res) => {
        return res.data
    }, (err) => {
        return Promise.reject(err);
    });
}

const getEscalaById = async (id) => {
    return await axios.get(`${server}/api/escala/${id}`).then((res) => {
        return res.data;
    }, (err) => {
        return Promise.reject(err);
    });
}

export {getAllEscalas, getEscalaById, insertEscala};
