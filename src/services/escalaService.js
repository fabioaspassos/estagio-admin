import axios from 'axios';
import { server } from '../common';

const insertEscala = async (escala) => {    
    await axios.post(`${server}/api/escala`, escala).then((res) => {
        return res;
    }, (err) => {
        alert('Erro na chamada do servidor!');
        console.log(err);
    });
}

const getAllEscalas = async () => {
    const resp = await axios.get(`${server}/api/escala`).then((res) => {
        return res.data;
    }, (err) => {
        alert('Erro na chamada do servidor!');
        console.log(err);
    });

    return resp;
}

const getEscalaById = async (id) => {
    const resp = await axios.get(`${server}/api/escala/${id}`).then((res) => {
        return res.data;
    }, (err) => {
        alert('Erro na chamada do servidor!');
        console.log(err);
    });

    return resp;
}

export {getAllEscalas, getEscalaById, insertEscala};
