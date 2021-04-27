import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import {useForm, Form} from '../../components/useForm';

const initialValues = {
    id: 0,
    nome: ''
}

export default function EstagioFormComponent(props) {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldsValues = values ) => {
        let temp = {...errors};
        if ('nome' in fieldsValues)
            temp.nome = fieldsValues.nome ? '' : 'Campo obrigatorio.';
        
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
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label='Nome da Escala'
                        name='nome'
                        value={values.nome}
                        onChange={handleInputChange}
                        error={errors.nome}
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