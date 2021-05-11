import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/grupo`;

const getAlunosOptionValues = async inputValue => {
    if (inputValue?.length < 4) return null;

    return await axios.get(`${server}/api/aluno/startingWith/${inputValue}?size=4&sort=nome`).then((res) => {
        const alunos = res.data;
        const options = alunos.map(aluno => ({label: aluno.nome, value: aluno.id}));

        return options;
    }, (err) => {
        return Promise.reject(err);
    });
}

const addAluno = (idGrupo, aluno) => (
    axios.post(`${base_url}/${idGrupo}/aluno`, aluno));

const removeAluno =  (idGrupo, aluno) => (
    axios.delete(`${base_url}/${idGrupo}/aluno/${aluno.id}`));

export {addAluno, removeAluno, getAlunosOptionValues}