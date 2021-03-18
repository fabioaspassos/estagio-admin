import React from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import {useForm, Form} from '../../components/useForm';
import * as employeeService from '../../services/employeeService';

const genderItems= [
    {id:'male', title:'Male'},
    {id:'female', title:'Female'},
    {id:'other', title:'other'},
]

const initialValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}
export default function EmployeeForm() { 

    const validate = (fieldsValues = values ) => {
        let temp = {...errors};
        if ('fullName' in fieldsValues)
            temp.fullName = fieldsValues.fullName ? '' : 'This field is required.';
        
        if ('email' in fieldsValues)
            temp.email = (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).test(fieldsValues.email) ? '' : 'Email s not valid.';
        
        if ('mobile' in fieldsValues)
            temp.mobile = fieldsValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
        
        if ('departmentId' in fieldsValues)
            temp.departmentId = fieldsValues.departmentId.length !== 0 ? '' : 'Minimum 10 numbers required.';
        
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
            employeeService.insertEmployee(values);
            resetForm();
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input 
                        label='Full Name'
                        name='fullName'
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label='email'
                        name='email'
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label='Mobile'
                        name='mobile'
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label='City'
                        name='city'
                        value={values.city}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup 
                        name='gender'
                        label='Gender'
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name='departmentId'
                        label='Department'
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name='hireDate'
                        label='Hire Date'
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name='isPermanent'
                        label='Permanent Employee'
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />
                    
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
