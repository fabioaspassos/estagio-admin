import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    makeStyles,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Toolbar
} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Controls from "../../components/controls/Controls";
import PageHeader from '../../components/PageHeader';
import Popup from "../../components/Popup";
import { getAllEscalas, insertEscala } from '../../services/escalaService';
import EscalaForm from './EscalaForm';

export default function Estagio() {
    const styles = useStyles();

    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [records, setRecords] = useState(getAllEscalas())

    let history = useHistory();

    function infoEstagio(estagio) {
        history.push(`/estagio/${estagio.id}`, { estagio: estagio });
    }

    const addOrEdit = (estagio, resetForm) => {
        let escalas = null;
        if (estagio.id === 0){
            console.log("Insert " +  JSON.stringify(estagio));
            escalas = insertEscala(estagio, records);
        } else {
            console.log("Update " + estagio);
        }
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);         
        setRecords(escalas);
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
            <PageHeader
                title='Escala de Estagios'
                subTitle='Lista dos Grupos de Estagios'
                icon={<ViewListIcon fontSize='large' />} />

            <Toolbar>
                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={styles.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Toolbar>

            <Grid className={styles.pageContent}>
                <Grid container spacing={2}>
                    {records.map((estagio) => (
                        <Grid item xs={11} key={estagio.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        Grupo: {estagio.descricao}
                                        <IconButton onClick={() => infoEstagio(estagio)} className={styles.detailsButton}>
                                            <ExitToAppIcon />
                                        </IconButton>
                                    </Typography>
                                    <br />
                                    {estagio.grupos && estagio.grupos.map((grupo) => (
                                        <Typography key={grupo.id}>
                                            {grupo.disciplina} entre {grupo.dataInicio} a {grupo.dataFim} - {grupo.local}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Popup
                title="Escala Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <EscalaForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>

        </>
    )
}

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    addButton: {
        padding: theme.spacing(0, 2),
        float: 'right',
        transform: 'scale(2.5)'
    },
    detailsButton: {
        padding: theme.spacing(0, 2),
        float: 'right',
        transform: 'scale(1.5)'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }

}))