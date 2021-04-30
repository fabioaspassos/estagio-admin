import React, { useEffect, useState } from 'react';
import ViewListIcon from '@material-ui/icons/ViewList';
import PageHeader from '../../components/PageHeader';
import { useStyles } from './estagio.styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FileCopyIcon from '@material-ui/icons/FileCopy';
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
import { Controller, useForm } from 'react-hook-form';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getEscalaById } from '../../services/escalaService';
import { addAluno, removeAluno, getAlunosOptionValues, copyGrupo } from '../../services/grupoService';
import AsyncSelect from 'react-select/async';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const initialModalGrupo = { open: false, currentGrupo: null };
export default function EstagioInfo(props) {
    const styles = useStyles();
    const state = props.location.state;
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const [estagio, setEstagio] = useState({});
    const [addModal, setAddModal] = useState(initialModalGrupo);
    const [deleteModal, setDeleteModal] = useState(initialModalGrupo);
    const [formModal, setFormModal] = useState(false);
    const [student, setStudent] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const openFormModal = () => {
        setFormModal(true);
    }

    const closeFormModal = () => {
        setFormModal(false);
    }

    const openAddModal = (grupo) => {
        setAddModal({ open: true, currentGrupo: grupo });
    }

    const closeAddModal = () => {
        setAddModal(initialModalGrupo);
    }

    const openDeleteModal = (grupo) => {
        console.log(`>openDeleteModal : ${grupo.id}`);
        setDeleteModal({ open: true, currentGrupo: grupo });
    }

    const closeDeleteModal = () => {
        setDeleteModal(initialModalGrupo);
    }

    const cloneGrupo = async (grupo) => {
        console.log(`>cloneGrupo grupo: ${grupo.id}`);
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        const res = await copyGrupo(
            grupo,
            res => setNotify({
                isOpen: true,
                message: 'Grupo copiado.',
                type: 'success'
            }),
            err => setNotify({
                isOpen: true,
                message: 'Erro ao copiar o grupo',
                type: 'error'
            })
        );
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const deleteStudent = async (grupo, student) => {
        console.log(`>deleteStudent grupo: ${grupo.id} aluno: ${JSON.stringify(student)}`);
        await removeAluno(
            grupo.id, student, 
            res => setNotify({
                isOpen: true,
                message: 'Aluno Removido.',
                type: 'success'
            }),
            err => setNotify({
                isOpen: true,
                message: 'Erro ao remover aluno do grupo',
                type: 'error'
            })
        );
        closeDeleteModal();
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const addStudent = async (grupo, student) => {
        console.log(`Chamada para adicionar grupo:${grupo.id} e aluno: ${JSON.stringify(student)}`);
        await addAluno(
            grupo.id, student,
            res => setNotify({
                isOpen: true,
                message: 'Aluno Adcionado.',
                type: 'success'
            }),
            err => setNotify({
                isOpen: true,
                message: 'Erro ao adcionar aluno no grupo',
                type: 'error'
            })
        );
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
                icon={<ViewListIcon fontSize='large' />} />
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
                                    {grupo.nome}
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
                                            setStudent({ id: aluno.id, name: aluno.nome });
                                            openDeleteModal(grupo);
                                        }}>
                                        {aluno.id} - {aluno.nome}
                                    </Typography>
                                ))}
                            </CardContent>
                            <CardActions>
                                <IconButton edge="start" className={styles.addButtonInfo} onClick={
                                    () => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Tem certeza que deseja duplicar este Grupo ?',
                                            subTitle: "",
                                            onConfirm: () => { cloneGrupo(grupo) }
                                        })
                                    }}>
                                    <FileCopyIcon />
                                </IconButton>
                                <IconButton edge="start" className={styles.addButtonInfo} onClick={() => openAddModal(grupo)}>
                                    <PersonAddIcon />
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
                <DialogTitle id="form-dialog-title">Novo Grupo</DialogTitle>
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
                                    name="disciplina" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('preceptor')}
                                    required
                                    fullWidth
                                    id="preceptor"
                                    label="Preceptor"
                                    name="preceptor" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('local')}
                                    required
                                    fullWidth
                                    id="local"
                                    label="Local"
                                    name="local" />
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
                                                }} />
                                        )}
                                        control={control}
                                        name="dataInicio"
                                        rules={{ required: true }}
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
                                                }} />
                                        )}
                                        control={control}
                                        name="dataFim"
                                        rules={{ required: true }}
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
                                    name="turno" />
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
            <Dialog open={addModal.open} onClose={closeAddModal} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Adicionar Aluno</DialogTitle>
                <DialogContent className={styles.autocompleteStudent}>
                    <AsyncSelect
                        isClearable
                        loadOptions={getOptionsAlunos}
                        onChange={option => {
                            const aluno = { id: option?.value, nome: option?.label };
                            setStudent(aluno);
                        }
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddModal}>
                        Cancelar
                    </Button>
                    <Button onClick={() => addStudent(addModal.currentGrupo, student)} variant="contained" color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const _renderModalDeleteStudent = () => {
        return (
            <Dialog open={deleteModal.open} onClose={closeDeleteModal} aria-labelledby="form-dialog-title" fullWidth={true}>
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
                    <Button onClick={() => deleteStudent(deleteModal.currentGrupo, student)} variant="contained" color="secondary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <>
            
            <Grid className={styles.pageContent}>
                {_renderTopBody()}
                {_renderContentBody()}
                {_renderModalForm()}
                {_renderModalAddStudent()}
                {_renderModalDeleteStudent()}
            </Grid>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </>
    );
}
