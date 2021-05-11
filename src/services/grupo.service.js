import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/grupo`;

const copyGrupo = (grupo) => (
    axios.post(`${base_url}/${grupo.id}/duplicate`));

const createGrupo = (grupo) => (
    axios.post(`${base_url}`, grupo));

const updateGrupo = (grupo) => (
    axios.put(`${base_url}`, grupo));

export { copyGrupo, createGrupo, updateGrupo };