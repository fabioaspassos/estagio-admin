import React, { useEffect, useState } from 'react';
import ViewListIcon from '@material-ui/icons/ViewList';
import PageHeader from '../../components/PageHeader';
import { useStyles } from './estagio.styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { 
    Paper, 
    Grid, 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    IconButton, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions,
    Button
} from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import {Form} from '../../components/useForm';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getEscalaById } from '../../services/escalaService';

export default function EstagioInfo(props) {
    const styles = useStyles();
    const state = props.location.state;
    const [estagio, setEstagio] = useState({});
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [student, setStudent] = useState(null);

    const openFormModal = () => {
        setFormModal(true);
    }

    const closeFormModal = () => {
        setFormModal(false);
    }

    const openAddModal = () => {
        setAddModal(true);
    }

    const closeAddModal = () => {
        setAddModal(false);
    }

    const openDeleteModal = () => {
        setDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }    

    const deleteStudent = (student) => {
        console.log(`Chamada para deleter aluno: ${JSON.stringify(student)}`);
        closeDeleteModal();
    }

    const addStudent = (student) => {
        console.log(`Chamada para adicionar aluno: ${JSON.stringify(student)}`);
        closeAddModal();
    }

    useEffect(() => {
        const { estagio } = state;
        getEscalaById(estagio.id).then(data => {
            setEstagio(data);
        })
    }, [state, setEstagio]);

    const _renderSectionHeader = () => {
        return (
            <PageHeader 
                title='Escala de Estagios'
                subTitle='Lista dos Grupos de Estagios' 
                icon={ <ViewListIcon fontSize='large'/> } />
        );
    }

    const _renderTopBody = () => {
        return (
            <Grid className={styles.topTittle}>
                <Paper className={styles.paper}>
                    <Typography variant="h5" key={estagio.id}>
                        Escala: {estagio.nome}
                        <IconButton onClick={() => openFormModal()} className={styles.detailsButton}>
                            <AddCircleIcon />
                        </IconButton>
                    </Typography>
                </Paper> 
            </Grid>
        );
    }

    const _renderContentBody = () => {
        return (
            <Grid container spacing={2}>
                {estagio.grupos && estagio.grupos.map((grupo) => (
                    <Grid item md={6} key={grupo.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {grupo.disciplina.descricao}
                                </Typography>
                                <Typography>
                                    {grupo.dataInicio} a {grupo.dataFim}
                                </Typography>
                                <Typography>
                                    {grupo.preceptor.nome} {grupo.campoEstagio.nome}
                                </Typography>
                                <hr />
                                {grupo.alunos && grupo.alunos.map((aluno) => (
                                    <Typography value={aluno} key={aluno.id} 
                                        onClick={() => {
                                            setStudent({id: aluno.id, name: aluno.nome}); 
                                            openDeleteModal();
                                        }}>
                                        {aluno.id} - {aluno.nome}
                                    </Typography>
                                ))}
                            </CardContent>
                            <CardActions>
                                <IconButton edge="start" className={styles.addButtonInfo} onClick={openAddModal}>
                                    <PersonAddIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    const _renderModalForm = () => {
        return (
            <Dialog open={formModal} onClose={closeFormModal} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Adicionar Disciplina</DialogTitle>
                <DialogContent>
                    <Form>
                        <Grid container>
                            <Grid item xs={12}>
                                <Controls.Input 
                                    label='Disciplina'
                                    name='disciplina'/>
                            </Grid>
                            <Grid item xs={12}>
                                <Controls.Input
                                    label='Preceptor'
                                    name='preceptor'/>
                            </Grid>
                            <Grid item xs={12}>
                                <Controls.Input
                                    label='Local'
                                    name='local'/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controls.DatePicker
                                    name='Data Inicio'
                                    label='dataInicio'/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controls.DatePicker
                                    name='Data Fim'
                                    label='dataFim'/>
                            </Grid>
                            <Grid item xs={12}>
                                <Controls.Input
                                    label='Turno'
                                    name='turno' />
                            </Grid>
                        </Grid>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeFormModal}>
                        Cancelar
                    </Button>
                    <Button onClick={closeFormModal} variant="contained" color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const _renderModalAddStudent = () => {
        return (
            <Dialog open={addModal} onClose={closeAddModal} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Adicionar Aluno</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Matrícula ou Nome"
                        type="text"
                        fullWidth
                        onChange={data => setStudent({name: data.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddModal}>
                        Cancelar
                    </Button>
                    <Button onClick={() => addStudent(student)} variant="contained" color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const _renderModalDeleteStudent = () => {
        return (
            <Dialog open={deleteModal} onClose={closeDeleteModal} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Remover Aluno</DialogTitle>
                <DialogContent>
                    {student 
                    ? 
                        <Typography>
                            {student.id} - {student.name}
                        </Typography>
                    : 
                        <Typography />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteModal}>
                        Cancelar
                    </Button>
                    <Button onClick={() => deleteStudent(student)} variant="contained" color="secondary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <>
            {_renderSectionHeader()}
            <Grid className={styles.pageContent}>
                {_renderTopBody()}
                {_renderContentBody()}
                {_renderModalForm()}
                {_renderModalAddStudent()}
                {_renderModalDeleteStudent()}
            </Grid>
        </>
      );
}
