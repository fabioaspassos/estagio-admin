import axios from 'axios';
import { server } from '../common';

const insertEscala= async (newEscala) => {    
    let res = await axios.post(`${server}/api/escala`, newEscala);
    return res;
}

const getAllEscalas = async () => {
    let res = await axios.get(`${server}/api/escala`);
    return res.data;
}
export {getAllEscalas, insertEscala};

const escalasmok = [
        {
            id:'1', 
            descricao:'1823-M-B',
            grupos: [
                {
                    id: '1',
                    id_disciplina: '1',
                    disciplina: 'Introducao',
                    id_preceptor: '1',
                    preceptor: 'Zenilson',
                    id_local: '1',
                    local: 'PROCAPE',
                    setor: 'HLP',
                    dataInicio: '2021-03-15',
                    dataFim: '2021-03-20',
                    turno:'NOITE',
                    alunos: [
                        {
                            matricula: '11111',
                            nome: 'Maria Antonio' 
                        },
                        {
                            matricula: '22222',
                            nome: 'Antonio Maria' 
                        },
                        {
                            matricula: '33333',
                            nome: 'Ricky James' 
                        },
                        {
                            matricula: '44444',
                            nome: 'James Ricky' 
                        },
                        {
                            matricula: '55555',
                            nome: 'Marta Makens' 
                        },
                        {
                            matricula: '66666',
                            nome: 'Makens Marta' 
                        },
                    ]
                },
                {
                    id: '2',
                    id_disciplina: '2',
                    disciplina: 'Clinica Medica',
                    id_preceptor: '1',
                    preceptor: 'Jose',
                    id_local: '1',
                    local: 'Madalena',
                    setor: 'HLP',
                    dataInicio: '2021-03-15',
                    dataFim: '2021-03-20',
                    turno:'MANHA',
                    alunos: [
                        {
                            matricula: '234324',
                            nome: 'Maria Antonio' 
                        },
                        {
                            matricula: '153452',
                            nome: 'Antonio Maria' 
                        },
                        {
                            matricula: '562656',
                            nome: 'Ricky James' 
                        },
                        {
                            matricula: '52464',
                            nome: 'James Ricky' 
                        },
                        {
                            matricula: '45678',
                            nome: 'Marta Makens' 
                        },
                        {
                            matricula: '1246',
                            nome: 'Makens Marta' 
                        },
                    ]
                },                                
            ]
        },
        {
            id:'2', 
            descricao:'1823-M-A',
            grupos: [
                {
                    id: '1',
                    id_disciplina: '3',
                    disciplina: 'Curso Enfermagem',
                    id_preceptor: '1',
                    preceptor: 'Zenilson',
                    id_local: '4',
                    local: 'SANTOS',
                    setor: 'HLP',
                    dataInicio: '2021-03-15',
                    dataFim: '2021-03-20',
                    turno:'NOITE'
                },
                {
                    id: '2',
                    id_disciplina: '4',
                    disciplina: 'Clinica odontologica',
                    id_preceptor: '1',
                    preceptor: 'Jose',
                    id_local: '3',
                    local: 'Palmeira',
                    setor: 'HLP',
                    dataInicio: '2021-03-15',
                    dataFim: '2021-03-20',
                    turno:'MANHA'
                }, 
                {
                    id: '7',
                    id_disciplina: '2',
                    disciplina: 'Clinica Fisio',
                    id_preceptor: '1',
                    preceptor: 'Jose',
                    id_local: '1',
                    local: 'Rio de Janeiro',
                    setor: 'HLP',
                    dataInicio: '2021-03-15',
                    dataFim: '2021-03-20',
                    turno:'MANHA'
                },                                  
            ]
        },
        {
            id:'3', 
            descricao:'1829-A-B',
            grupos: [
                {
                    id: '5',
                    id_disciplina: '1',
                    disciplina: 'Intro',
                    id_preceptor: '1',
                    preceptor: 'Zenilson',
                    id_local: '1',
                    local: 'Sao Paulo',
                    setor: 'HLP',
                    dataInicio: '2021-03-15',
                    dataFim: '2021-03-20',
                    turno:'NOITE'
                },
                {
                    id: '7',
                    id_disciplina: '2',
                    disciplina: 'Clinica Fisio',
                    id_preceptor: '1',
                    preceptor: 'Jose',
                    id_local: '1',
                    local: 'Rio de Janeiro',
                    setor: 'HLP',
                    dataInicio: '2021-03-15',
                    dataFim: '2021-03-20',
                    turno:'MANHA'
                },                                
            ]
        },
    ];
