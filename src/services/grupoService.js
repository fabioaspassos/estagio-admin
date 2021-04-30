import axios from 'axios';
import { server } from '../common';

const base_url = `${server}/api/grupo`;

const getAlunosOptionValues = async inputValue => {
    if (inputValue?.length < 4) return null;
    const resp = await axios.get(`${server}/api/aluno/startingWith/${inputValue}?size=4&sort=nome`);
    const alunos = resp.data;
    let options = alunos.map(aluno => ( {label: aluno.nome, value: aluno.id} ));
    return options;
  }


const addAluno = async (idGrupo, aluno, sucess, error) => {
    await axios.post(`${base_url}/${idGrupo}/aluno`, aluno)
    .then(sucess, error);
}

const removeAluno = async (idGrupo, aluno, sucess, error) => {
    await axios.delete(`${base_url}/${idGrupo}/aluno/${aluno.id}`)
    .then(sucess, error);
}

const copyGrupo = async (grupo, sucess, error) => {
    await axios.post(`${base_url}/${grupo.id}/duplicate`)
    .then(sucess, error);
}

export {addAluno, removeAluno, getAlunosOptionValues, copyGrupo};