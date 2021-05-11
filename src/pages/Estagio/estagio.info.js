import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';
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
    DialogActions,
    Button,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useStyles } from './estagio.styles';
import { getEscalaById } from '../../services/escala.service';
import { copyGrupo, createGrupo, updateGrupo } from '../../services/grupo.service';
import { addAluno, removeAluno, getAlunosOptionValues } from '../../services/aluno.service';
import EstagioForm from './estagio.form';
import {convertDateStringFormat} from '../../utils/dateUtils';

const initialModalGrupo = { open: false, currentGrupo: null };

export default function EstagioInfo(props) {
    const styles = useStyles();
    const state = props.location.state;

    const [estagio, setEstagio] = useState({});
    const [addModal, setAddModal] = useState(initialModalGrupo);
    const [deleteModal, setDeleteModal] = useState(initialModalGrupo);
    const [formModal, setFormModal] = useState({open: false, title: '', content: null});
    const [student, setStudent] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const closeFormModal = () => {
        setFormModal({open: false});
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

        await copyGrupo(grupo).then(() => {
            setNotify({
                isOpen: true,
                message: 'Grupo copiado.',
                type: 'success'
            });
        }).catch(() => {
            setNotify({
                isOpen: true,
                message: 'Erro ao copiar o grupo',
                type: 'error'
            });
        });

        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const deleteStudent = async (grupo, student) => {
        console.log(`>deleteStudent grupo: ${grupo.id} aluno: ${JSON.stringify(student)}`);

        await removeAluno(grupo.id, student).then(() => {
            setNotify({
                isOpen: true,
                message: 'Aluno Removido.',
                type: 'success'
            });
        }).catch(() => {
            setNotify({
                isOpen: true,
                message: 'Erro ao remover aluno do grupo',
                type: 'error'
            });
        });

        closeDeleteModal();
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const addStudent = async (grupo, student) => {
        console.log(`Chamada para adicionar grupo:${grupo.id} e aluno: ${JSON.stringify(student)}`);

        await addAluno(grupo.id, student).then(() => {
            setNotify({
                isOpen: true,
                message: 'Aluno Adicionado.',
                type: 'success'
            });
        }).catch(() => {
            setNotify({
                isOpen: true,
                message: 'Erro ao adcionar aluno no grupo',
                type: 'error'
            });
        });

        closeAddModal();
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const addGrupo = async (data) => {
        const grupo = {...data, escala: {id: estagio.id}}

        await createGrupo(grupo).then(() => {
            setNotify({
                isOpen: true,
                message: 'Grupo Adicionado.',
                type: 'success'
            });
        }).catch(() => {
            setNotify({
                isOpen: true,
                message: 'Erro ao adicionar novo grupo',
                type: 'error'
            });
        });

        closeFormModal();
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    const editGrupo = async (data) => {
        const grupo = {...data, escala: {id: estagio.id}};

        await updateGrupo(grupo).then(() => {
            setNotify({
                isOpen: true,
                message: 'Grupo Editado.',
                type: 'success'
            });
        }).catch(() => {
            setNotify({
                isOpen: true,
                message: 'Erro ao editar grupo',
                type: 'error'
            });
        });

        closeFormModal();
        getEscalaById(estagio.id).then(data => setEstagio(data));
    }

    useEffect(() => {
        const { estagio } = state;
        getEscalaById(estagio.id).then(data => {
            setEstagio(data);
        })
    }, [state, setEstagio]);

    const getOptionsAlunos = inputValue => new Promise(resolve => {
        setTimeout(() => {
            resolve(getAlunosOptionValues(inputValue));
        }, 1000);
    });

    const BackToEstagio = () => {
        let history = useHistory();
        return (
            <IconButton onClick={() => history.push('/estagio')} className={styles.detailsButton}>
                <ArrowBackIcon />
            </IconButton>
        );
    }

    const _renderTopBody = () => {
        return (
            <Grid className={styles.topTittle}>
                <Paper className={styles.paper}>
                    <BackToEstagio/>
                    <Typography variant="h5" key={estagio.id}>
                        Escala: {estagio.nome}
                    </Typography>
                    <IconButton onClick={() => setFormModal({open: true, title: 'Novo Grupo', content: null})} className={styles.detailsButton}>
                        <AddCircleIcon />
                    </IconButton>
                </Paper>
            </Grid>
        );
    }

    const _renderContentBody = () => {
        return (
            <Grid container spacing={2}>
                {estagio.grupos?.map((grupo) => (
                    <Grid item md={6} key={grupo.id}>
                        <Card>
                            <CardContent>
                                <div className={styles.cardLine}>
                                    <Typography variant="h6">
                                        {grupo.disciplina?.descricao}
                                    </Typography>
                                    <Typography>
                                        {grupo.nome}
                                    </Typography>
                                    <IconButton onClick={() => setFormModal({open: true, title: 'Editar Grupo', content: grupo})} className={styles.editButton}>
                                        <EditIcon />
                                    </IconButton>
                                </div>
                                <Typography>
                                    {grupo.preceptor?.nome}
                                </Typography>
                                <div className={styles.cardLine}>
                                    <Typography>
                                        {grupo.campoEstagio?.nome}
                                    </Typography>
                                    <Typography>
                                        {convertDateStringFormat(grupo.dataInicio, "YYYY-MM-DD", "DD/MM/YYYY")} a {convertDateStringFormat(grupo.dataFim, "YYYY-MM-DD", "DD/MM/YYYY")}
                                    </Typography>
                                </div>

                                <hr />
                                {grupo.alunos?.map((aluno) => (
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

    const _renderModalForm = () => {
        return (
            <Dialog open={formModal.open} onClose={closeFormModal} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">{formModal.title}</DialogTitle>
                <EstagioForm initialValues={formModal.content} handleCloseForm={closeFormModal} handleSubmit={formModal.content ? editGrupo : addGrupo}/>
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
                        }}
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
