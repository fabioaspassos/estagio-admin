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

const addAluno = async (idGrupo, aluno) => {
    return await axios.post(`${base_url}/${idGrupo}/aluno`, aluno).then((res) => {
        return res;
    }, (err) => {
        return Promise.reject(err);
    });
}

const removeAluno = async (idGrupo, aluno) => {
    return await axios.delete(`${base_url}/${idGrupo}/aluno/${aluno.id}`).then((res) => { 
        return res;
    }, (err) => {
        return Promise.reject(err);
    });
}

export {addAluno, removeAluno, getAlunosOptionValues}