import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/campo`;

const getCamposOptionValues = async inputValue => {
    if (inputValue?.length < 4) return null;

    return await axios.get(`${base_url}/startingWith/${inputValue}`).then((res) => {
        const campos = res.data;
        const options = campos.map(campo => (
            { label: campo.nome, value: campo.id }
        ));
        
        return options;
    }, (err) => {
        return Promise.reject(err);
    });
}

export { getCamposOptionValues };