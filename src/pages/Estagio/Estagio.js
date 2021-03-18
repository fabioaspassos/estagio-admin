import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';

import PageHeader from '../../components/PageHeader';

export default function Estagio() {
    const styles = useStyles();

    return (
        <>
            <PageHeader 
                title='Escala de Estagios'
                subTitle='Lista dos Grupos de Estagios' 
                icon={ <ViewListIcon fontSize='large'/> } />
            <Paper className={styles.pageContent}>
                <div></div>
            </Paper>
        </>
    )
}

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))
