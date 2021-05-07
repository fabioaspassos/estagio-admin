import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/usuario`;

const authenticate = async (user, sucess, error) => {
    await axios.post(`${base_url}/auth`, user)
    .then(sucess, error);
}

export {authenticate};