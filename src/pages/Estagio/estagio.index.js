import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Toolbar,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions,
    Button
} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStyles } from './estagio.styles';
import Controls from "../../components/controls/Controls";
import PageHeader from '../../components/PageHeader';
import { getAllEscalas, insertEscala } from '../../services/escala.service';
import {convertDateStringFormat} from '../../utils/dateUtils';

export default function Estagio() {
    const styles = useStyles();
    let history = useHistory();
    const [modalStatus, setModalStatus] = useState(false);
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({
        nome: ''
    });

    function navigateToInfoEstagio(estagio) {
        history.push(`/estagio/${estagio.id}`, { estagio: estagio });
    }

    const insertNewRecord = async () => {
        await insertEscala(newRecord);
        await getAllEscalas().then(data => setRecords(data));
        closeModal();
    }

    const openModal = () => {
        setModalStatus(true);
    }

    const closeModal = () => {
        setModalStatus(false);
    }

    useEffect(() => {
        getAllEscalas().then(data => setRecords(data));
    }, [setRecords]); 

    const _renderSectionHeader = () => {
        return (
            <PageHeader
                title='Escala de Estagios'
                subTitle='Lista dos Grupos de Estagios'
                icon={<ViewListIcon fontSize='large' />} />
        );
    }

    const _renderToolbar = () => {
        return (
            <Toolbar>
                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={styles.newButton}
                    onClick={() => { openModal()}}
                />
            </Toolbar>
        );
    }

    const _renderSectionBody = () => {
        return (
            <Grid className={styles.pageContent}>
                <Grid container spacing={2}>
                    {records?.map((estagio) => (
                        <Grid item xs={11} key={estagio.id}>
                            <Card className={styles.card}>
                                <CardContent>
                                    <Typography variant="h5">
                                        Grupo: {estagio.nome}
                                        <IconButton onClick={() => navigateToInfoEstagio(estagio)} className={styles.detailsButton}>
                                            <ExitToAppIcon />
                                        </IconButton>
                                    </Typography>
                                    <br />
                                    {estagio.grupos?.map((grupo) => (
                                        <Typography key={grupo.id}>
                                            {grupo.disciplina.descricao} entre {convertDateStringFormat(grupo.dataInicio, "YYYY-MM-DD", "DD/MM/YYYY")} a 
                                                {' ' + convertDateStringFormat(grupo.dataFim, "YYYY-MM-DD", "DD/MM/YYYY")} - {grupo.campoEstagio.nome}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    }

    const _renderModal = () => {
        return (
            <Dialog open={modalStatus} onClose={openModal} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Formulário Escala</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Nome da Escala"
                type="text"
                fullWidth
                onChange={data => setNewRecord({nome: data.target.value})}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>
                Cancelar
              </Button>
              <Button onClick={insertNewRecord} variant="contained" color="primary">
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        );
    }

    return (
        <>
            {_renderSectionHeader()}
            {_renderToolbar()}
            {_renderSectionBody()}
            {_renderModal()}
        </>
    );
}
