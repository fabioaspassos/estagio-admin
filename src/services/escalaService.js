const KEYS = {
    escala: 'escala',
    escalaId: 'escalaId'
}

export const getAllEscalas = () =>(
    [
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
                    turno:'NOITE'
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
                    turno:'MANHA'
                },                                
            ]
        },
        {
            id:'2', 
            descricao:'1823-M-A',
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
                    turno:'NOITE'
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
                    turno:'MANHA'
                },                                
            ]
        },

    ]
);
