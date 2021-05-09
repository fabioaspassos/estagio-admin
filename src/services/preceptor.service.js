import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/preceptor`;

const getPreceptorsOptionValues = async inputValue => {
    if (inputValue?.length < 4) return null;

    return await axios.get(`${base_url}/startingWith/${inputValue}`).then((res) => {
        const preceptors = res.data;
        const options = preceptors.map(preceptor => (
            { label: preceptor.nome, value: preceptor.id }
        ));
        
        return options;
    }, (err) => {
        return Promise.reject(err);
    });
}

export { getPreceptorsOptionValues };