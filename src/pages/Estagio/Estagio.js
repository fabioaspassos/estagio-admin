import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Card, CardContent, Typography, Grid, IconButton, Button, Dialog, TextField, DialogActions, DialogContent } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import PageHeader from '../../components/PageHeader';
import { getAllEscalas, insertEscala } from '../../services/escalaService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const initialEscala = [{id:'1', nome:''}, {id:'2', nome:''}];
export default function Estagio() {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
    const [nomeGrupo, setNomeGrupo] = React.useState('');
    const [estagios, setEstagios] = React.useState(initialEscala);
    
    useEffect(() => {
        getAllEscalas().then(data => setEstagios(data));
    });

    let history = useHistory();

    function abrirModal() {
        setOpen(true);
    }

    function fecharModal() {
        setOpen(false);
    }

    function novoGrupo() {
        let newEstagios = insertEscala(nomeGrupo, estagios);
        setEstagios(newEstagios);
        fecharModal();
    }

    function infoEstagio(estagio) {
        history.push(`/estagio/${estagio.id}`, {estagio: estagio});
    }
   
    return (
        <>
            <PageHeader 
                title='Escala de Estagios'
                subTitle='Lista dos Grupos de Estagios' 
                icon={ <ViewListIcon fontSize='large'/> } />
            <Grid className={styles.pageContent}>

                <Grid>
                    <IconButton onClick={abrirModal} className={styles.addButton}>
                        <AddBoxIcon/>
                    </IconButton>

                    <Dialog open={open} onClose={fecharModal} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                        <DialogContent>
                            <form>
                                <TextField 
                                    autoFocus
                                    margin="dense"
                                    id="grupo"
                                    label="Grupo"
                                    type="text"
                                    fullWidth
                                    onChange={event => setNomeGrupo(event.target.value)}
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={fecharModal} color="primary">Cancelar</Button>
                            <Button onClick={novoGrupo} color="primary">Registrar</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Grid container spacing={2}>
                    {estagios.map((estagio) => (
                        <Grid item xs={11} key={estagio.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        Grupo: {estagio.nome}
                                        <IconButton onClick={() => infoEstagio(estagio)} className={styles.detailsButton}>
                                            <ExitToAppIcon />
                                        </IconButton>
                                    </Typography>
                                    <br />
                                    {estagio.grupos && estagio.grupos.map((grupo) => (
                                        <Typography key={grupo.id}>
                                            {grupo.disciplina?.descricao} entre {grupo.dataInicio} a {grupo.dataFim} - {grupo.campoEstagio?.nome}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles(theme => ({
    pageContent:{
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
}))
