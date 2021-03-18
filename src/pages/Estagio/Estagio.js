import React from 'react';
import { Paper, makeStyles, Card, CardContent, Typography} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import PageHeader from '../../components/PageHeader';
import { getAllEscalas } from '../../services/escalaService';

export default function Estagio() {
    const styles = useStyles();
    const estagios = getAllEscalas();

    return (
        <>
            <PageHeader 
                title='Escala de Estagios'
                subTitle='Lista dos Grupos de Estagios' 
                icon={ <ViewListIcon fontSize='large'/> } />
            <Paper className={styles.pageContent}>
                {estagios.map((estagio) => (
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Grupo: {estagio.descricao}
                            </Typography>
                            {estagio.grupos.map((grupo) => (
                                <Typography>
                                    {grupo.disciplina} entre {grupo.dataInicio} a {grupo.dataFim} - {grupo.local}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </Paper>
        </>
    )
}

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
}))
