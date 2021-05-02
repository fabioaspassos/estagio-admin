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
import { ptBR } from "date-fns/locale";
import { convertDateStringFormat } from '../../utils/dateUtils';

export default function EstagioForm(props) {

    const content = props.initialValues;

    const [dateStart, setDateStart] = useState(content?.dataInicio);
    const [dateEnd, setDateEnd] = useState(content?.dataFim);

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.dataInicio = dateStart;
        console.table(data);
        // props.handleSubmit(data);
        // reset();
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
                    <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                render={({
                                    field: { onChange, value = dateStart }
                                }) => (
                                    <KeyboardDatePicker
                                        fullWidth
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="dataInicio"
                                        label="Data Inicio"
                                        inputValue={convertDateStringFormat(value, "YYYY-MM-DD", "DD/MM/YYYY")}
                                        maxDate={dateEnd}
                                        onChange={(e) => { onChange(e); setDateStart(e); }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }} />
                                )}
                                control={control}
                                name="dataInicio"
                            />
                            {errors.dataInicio && dateStart && <FormHelperText error>Campo Data Inicio é obrigatório!</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                render={({
                                    field: { onChange, value = dateEnd}
                                }) => (
                                    <KeyboardDatePicker
                                        fullWidth
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="dataFim"
                                        label="Data Término"
                                        inputValue={convertDateStringFormat(value, "YYYY-MM-DD", "DD/MM/YYYY")}
                                        minDate={dateStart}
                                        onChange={(e) => { onChange(e); setDateEnd(e); }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }} />
                                )}
                                control={control}
                                name="dataFim"
                                rules={{ required: true }}
                            />
                            {errors.dataFim && dateEnd && <FormHelperText error>Campo Data Término é obrigatório!</FormHelperText>}
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