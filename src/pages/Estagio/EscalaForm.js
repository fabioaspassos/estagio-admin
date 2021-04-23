import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import {useForm, Form} from '../../components/useForm';


const initialValues = {
    id: 0,
    descricao: ''
}

export default function EscalaForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldsValues = values ) => {
        let temp = {...errors};
        if ('descricao' in fieldsValues)
            temp.descricao = fieldsValues.descricao ? '' : 'Campo obrigatorio.';
        
        setErrors({ ...temp});

        if (fieldsValues === values)
            return Object.values(temp).every( x => x === '');
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()){
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label='Descricao'
                        name='descricao'
                        value={values.descricao}
                        onChange={handleInputChange}
                        error={errors.descricao}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Controls.Button
                            type='submit'
                            text='Submit'
                        />
                        <Controls.Button
                            text='Reset'
                            color='default'
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
