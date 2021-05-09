import React, {useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import {
    Grid,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormHelperText,
    Select,
    InputLabel,
    MenuItem
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import { convertDateStringFormat, convertDate } from '../../utils/dateUtils';
import { getDisciplinasOptionValues } from '../../services/disciplina.service';
import { getPreceptorsOptionValues } from '../../services/preceptor.service';
import { getCamposOptionValues } from '../../services/campo.service';

export default function EstagioForm(props) {

    const content = props.initialValues;

    const [dateStart, setDateStart] = useState((content) ? content.dataInicio: Date.now());
    const [dateEnd, setDateEnd] = useState((content) ? content.dataFim: Date.now());

    const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm({
        defaultValues: {
            disciplina: content?.disciplina,
            preceptor: content?.preceptor,
            campoEstagio: content?.campoEstagio,
            dataInicio: content?.dataInicio,
            dataFim: content?.dataFim,
            turno: content?.turno,
        } 
    });

    const onSubmit = async (data) => {
        data.dataInicio = new Date(dateStart).toISOString();
        data.dataFim = new Date(dateEnd).toISOString();

        props.handleSubmit(data);
    }

    const getOptionsDisciplinas = inputValue => new Promise(resolve => {
        setTimeout(() => {
            resolve(getDisciplinasOptionValues(inputValue));
        }, 1000);
    });

    const getOptionsPreceptores = inputValue => new Promise(resolve => {
        setTimeout(() => {
            resolve(getPreceptorsOptionValues(inputValue));
        }, 1000);
    });

    const getOptionsCampos = inputValue => new Promise(resolve => {
        setTimeout(() => {
            resolve(getCamposOptionValues(inputValue));
        }, 1000);
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            {...register('nome')}
                            fullWidth
                            required
                            label="Nome"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Disciplina</InputLabel>
                        <AsyncSelect
                            {...register('disciplina')}
                            isClearable
                            defaultValue={{value: content?.disciplina.id, label: content?.disciplina.descricao}}
                            loadOptions={getOptionsDisciplinas}
                            onChange={option => {
                                const disciplina = { id: option?.value, descricao: option?.label };
                                setValue('disciplina', disciplina);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Preceptor</InputLabel>
                        <AsyncSelect
                            {...register('preceptor')}
                            isClearable
                            defaultValue={{value: content?.preceptor.id, label: content?.preceptor.nome}}
                            loadOptions={getOptionsPreceptores}
                            onChange={option => {
                                const preceptor = { id: option?.value, nome: option?.label };
                                setValue('preceptor', preceptor);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Local</InputLabel>
                        <AsyncSelect
                            {...register('campoEstagio')}
                            isClearable
                            defaultValue={{value: content?.campo.id, label: content?.campo.nome}}
                            loadOptions={getOptionsCampos}
                            onChange={option => {
                                const campo = { id: option?.value, nome: option?.label };
                                setValue('campoEstagio', campo);
                            }}
                        />
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
                            />
                            {errors.dataFim && dateEnd && <FormHelperText error>Campo Data Término é obrigatório!</FormHelperText>}
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12}>
                        <InputLabel>Turno</InputLabel>
                        <Select
                            {...register('turno')}
                            id="turno"
                            label="Turno"
                            defaultValue={content?.turno}
                            onChange={(e) => setValue('turno', e.target.value)}
                            required
                            fullWidth>
                                <MenuItem selected value={'manha'}>Manhã</MenuItem>
                                <MenuItem value={'tarde'}>Tarde</MenuItem>
                                <MenuItem value={'noite'}>Noite</MenuItem>
                        </Select>
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