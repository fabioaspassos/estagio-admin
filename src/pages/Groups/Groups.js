import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';

import PageHeader from '../../components/PageHeader';

export default function Groups() {
    const classes = useStyles();

    return (
        <>
            <PageHeader 
                title='Novo Grupo'
                subTitle='Form design with validations'
                icon={ <ViewListIcon fontSize='large'/> } />
            <Paper className={classes.pageContent}>
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
