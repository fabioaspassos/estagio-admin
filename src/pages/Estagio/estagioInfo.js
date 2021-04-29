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
    Button,
    FormHelperText
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {Controller, useForm} from 'react-hook-form';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getEscalaById } from '../../services/escalaService';

import { addAluno, removeAluno, getAlunosOptionValues } from '../../services/grupoService';
import AsyncSelect from 'react-select/async';

export default function EstagioInfo(props) {
    const styles = useStyles();
    const state = props.location.state;
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

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

    const deleteStudent = async (student) => {
        console.log(`Chamada para deleter aluno: ${JSON.stringify(student)}`);
        const res = await removeAluno(estagio.id, student);
        closeDeleteModal();
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const addStudent = async (student) => {
        console.log(`Chamada para adicionar aluno: ${JSON.stringify(student)}`);
        const res = await addAluno(estagio.id, student);
        closeAddModal();        
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const onSubmit = (data) => {
        console.log(`Chamada para o formulario: ${JSON.stringify(data)}`);
        reset();
    }

    useEffect(() => {
        const { estagio } = state;
        getEscalaById(estagio.id).then(data => {
            setEstagio(data);
        })
    }, [state, setEstagio]);

    const getOptionsAlunos = inputValue =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(getAlunosOptionValues(inputValue));
        }, 1000);
      });

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

    // TODO: extract this form as another component
    const _renderModalForm = () => {
        return (
            <Dialog open={formModal} onClose={closeFormModal} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Adicionar Disciplina</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('disciplina')}
                                    required
                                    fullWidth
                                    id="disciplina"
                                    label="Disciplina"
                                    name="disciplina"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('preceptor')}
                                    required
                                    fullWidth
                                    id="preceptor"
                                    label="Preceptor"
                                    name="preceptor"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('local')}
                                    required
                                    fullWidth
                                    id="local"
                                    label="Local"
                                    name="local"/>
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12} sm={6}>
                                    <Controller 
                                        render={({
                                            field: { onChange, value }
                                          }) => (
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="dataInicio"
                                                label="Date Inicio"
                                                value={value}
                                                onChange={onChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}/>
                                        )}
                                        control={control}
                                        name="dataInicio"
                                        rules={{required: true}}
                                    />
                                    {errors.dataInicio && <FormHelperText error>Campo Data Inicio é obrigatório!</FormHelperText>}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller 
                                        render={({
                                            field: { onChange, value }
                                          }) => (
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="dataFim"
                                                label="Date Término"
                                                value={value}
                                                onChange={onChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}/>
                                        )}
                                        control={control}
                                        name="dataFim"
                                        rules={{required: true}}
                                    />
                                    {errors.dataFim && <FormHelperText error>Campo Data Término é obrigatório!</FormHelperText>}
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('turno')}
                                    required
                                    fullWidth
                                    id="turno"
                                    label="Turno"
                                    name="turno"/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeFormModal}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Confirmar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }

    const _renderModalAddStudent = () => {
        return (
            <Dialog open={addModal} onClose={closeAddModal} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Adicionar Aluno</DialogTitle>
                <DialogContent className={styles.autocompleteStudent}>
                        <AsyncSelect
                            isClearable 
                            loadOptions={getOptionsAlunos}                         
                            onChange={ option => {                                 
                                    const aluno = {id: option?.value, nome: option?.label};
                                    setStudent(aluno);
                                }
                            }
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
