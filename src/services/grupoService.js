import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/grupo`;

const getAlunosOptionValues = async inputValue => {
    if (inputValue?.length < 4) return null;
    const resp = await axios.get(`${server}/api/aluno/startingWith/${inputValue}`);
    const alunos = resp.data;
    let options = alunos.map(aluno => ( {label: aluno.nome, value: aluno.id} ));
    return options;
  }


const addAluno = async (idGrupo, aluno) => {
    await axios.post(`${base_url}/${idGrupo}/aluno`, aluno).then((res) => {
        return res;
    }, (err) => {
        alert('Erro na chamada do servidor!');
        console.log(err);
    });
}

const removeAluno = async (idGrupo, aluno) => {
    await axios.delete(`${base_url}/${idGrupo}/aluno/${aluno.id}`).then((res) => {
        return res;
    }, (err) => {
        alert('Erro na chamada do servidor!');
        console.log(err);
    });
}

export {addAluno, removeAluno, getAlunosOptionValues};