import React from 'react';
import EmployeeForm from './EmployeeForm';
import PageHeader from '../../components/PageHeader';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <PageHeader 
                title='New Employee'
                subTitle='Form design with validations'
                icon={ <PeopleAltIcon fontSize='large'/> } />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}
