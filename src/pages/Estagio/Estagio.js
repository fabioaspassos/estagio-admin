import React from 'react';
import { makeStyles, Card, CardContent, Typography, Grid, IconButton, Button, Dialog, TextField, DialogActions, DialogContent } from '@material-ui/core';
import { Route } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import PageHeader from '../../components/PageHeader';
import { getAllEscalas } from '../../services/escalaService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export function EstagioHeader() {
    return (
        <>
        <PageHeader 
                title='Escala de Estagios'
                subTitle='Lista dos Grupos de Estagios' 
                icon={ <ViewListIcon fontSize='large'/> } />
        </>
    );
}

export default function Estagio() {
    const [open, setOpen] = React.useState(false);
    const styles = useStyles();
    let grupo;
    let estagios = getAllEscalas();

    function abrirModal() {
        setOpen(true);
    }

    function fecharModal() {
        setOpen(false);
    }

    function listarEstagio(estagio) {
        console.log(estagio);
        console.log(estagio.id);
    }
   
    return (
        <>
            <EstagioHeader />
            <Grid className={styles.pageContent}>

                <Grid>
                    <IconButton onClick={abrirModal}>
                        <AddBoxIcon/>
                    </IconButton>
                    <Dialog style={styles.dialogStyle} open={open} onClose={fecharModal} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <TextField 
                                autoFocus
                                margin="dense"
                                id="grupo"
                                value={grupo}
                                label="Grupo"
                                type="text"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={fecharModal} color="primary">Cancelar</Button>
                            <Button onClick={fecharModal} color="primary">Registrar</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Grid>
                    {estagios.map((estagio) => (
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    Grupo: {estagio.descricao}
                                    <IconButton onClick={() => listarEstagio(estagio)}>
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Typography>
                                {estagio.grupos.map((grupo) => (
                                    <Typography>
                                        {grupo.disciplina} entre {grupo.dataInicio} a {grupo.dataFim} - {grupo.local}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
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
}))
