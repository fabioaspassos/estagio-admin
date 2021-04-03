import React from 'react';
import ViewListIcon from '@material-ui/icons/ViewList';
import PageHeader from '../../components/PageHeader';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Paper, Grid, Card, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';

export default function DetalheEstagio(props) {
    const styles = useStyles();
    const { estagio } = props.location.state;

    return (
        <>
            <PageHeader 
                    title='Escala de Estagios'
                    subTitle='Lista dos Grupos de Estagios' 
                    icon={ <ViewListIcon fontSize='large'/> } />
            <Grid className={styles.pageContent}>
                <Grid className={styles.topTittle}>
                    <Paper className={styles.paper}>
                        <Typography variant="h5">
                            Escala: {estagio.descricao}
                        </Typography>
                    </Paper> 
                </Grid>

                <Grid container spacing={2}>
                    {estagio.grupos.map((grupo) => (
                        <Grid item md={6} key={grupo.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {grupo.disciplina} {grupo.dataInicio} a {grupo.dataFim} {grupo.turno}
                                    </Typography>
                                    <Typography>
                                        {grupo.preceptor} {grupo.local} - Setor: {grupo.setor}
                                    </Typography>
                                    <hr />
                                    {grupo.alunos && grupo.alunos.map((aluno) => (
                                        <Typography key={aluno.matricula}>
                                            {aluno.matricula} - {aluno.nome}
                                        </Typography>
                                    ))}
                                </CardContent>
                                <CardActions>
                                    <IconButton edge="start" className={styles.addButton}>
                                        <PersonAddIcon/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
      );
}

const useStyles = makeStyles((theme) => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    topTittle: {
        marginBottom: theme.spacing(4)
    },
    addButton: {
        padding: theme.spacing(0, 2),
        display: 'block',
        marginLeft: 'auto'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));