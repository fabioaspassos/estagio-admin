import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/disciplina`;

const getDisciplinasOptionValues = async inputValue => {
    if (inputValue?.length < 4) return null;

    return await axios.get(`${base_url}/startingWith/${inputValue}`).then((res) => {
        const disciplinas = res.data;
        const options = disciplinas.map(disciplina => (
            { label: disciplina.descricao, value: disciplina.id }
        ));
        
        return options;
    }, (err) => {
        return Promise.reject(err);
    });
}

export { getDisciplinasOptionValues };