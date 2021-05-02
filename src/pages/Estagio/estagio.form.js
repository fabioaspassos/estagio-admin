import React, {useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Grid,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormHelperText
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

export default function EstagioForm(props) {

    const content = props.initialValues;

    // TODO: verificar conversao de datas
    // const [dateStart, setDateStart] = useState(moment(new Date(content?.dataInicio)).format('DD/MM/YYYY'));
    // const [dateEnd, setDateEnd] = useState(moment(content?.dataFim).format('DD/MM/YYYY'));

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    console.table(content);

    const onSubmit = async (data) => {
        props.handleSubmit(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            {...register('disciplina')}
                            defaultValue={content?.disciplina.descricao}
                            required
                            fullWidth
                            id="disciplina"
                            label="Disciplina"
                            name="disciplina" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('preceptor')}
                            defaultValue={content?.preceptor.nome}
                            required
                            fullWidth
                            id="preceptor"
                            label="Preceptor"
                            name="preceptor" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('local')}
                            defaultValue={content?.campoEstagio.nome}
                            required
                            fullWidth
                            id="local"
                            label="Local"
                            name="local" />
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                render={({
                                    field: { onChange, value }
                                }) => (
                                    <KeyboardDatePicker
                                        fullWidth
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="dataInicio"
                                        label="Date Inicio"
                                        value={value}
                                        onChange={onChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }} />
                                )}
                                control={control}
                                name="dataInicio"
                                rules={{ required: true }}
                            />
                            {errors.dataInicio && <FormHelperText error>Campo Data Inicio é obrigatório!</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                render={({
                                    field: { onChange, value }
                                }) => (
                                    <KeyboardDatePicker
                                        fullWidth
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="dataFim"
                                        label="Date Término"
                                        value={value}
                                        onChange={onChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }} />
                                )}
                                control={control}
                                name="dataFim"
                                rules={{ required: true }}
                            />
                            {errors.dataFim && <FormHelperText error>Campo Data Término é obrigatório!</FormHelperText>}
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12}>
                        <TextField
                            {...register('turno')}
                            defaultValue={content?.turno}
                            required
                            fullWidth
                            id="turno"
                            label="Turno"
                            name="turno" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseForm}>
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </form>
    );
}