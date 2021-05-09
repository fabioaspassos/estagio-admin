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
import { convertDateStringFormat } from '../../utils/dateUtils';
import { getDisciplinasOptionValues } from '../../services/disciplina.service';
import { getPreceptorsOptionValues } from '../../services/preceptor.service';
import { getCamposOptionValues } from '../../services/campo.service';

export default function EstagioForm(props) {

    const content = props.initialValues;

    const [dateStart, setDateStart] = useState((content) ? content.dataInicio: Date.now());
    const [dateEnd, setDateEnd] = useState((content) ? content.dataFim: Date.now());

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        defaultValues: {
            id: content?.id,
            nome: content?.nome,
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
                        <InputLabel>Nome</InputLabel>
                        <TextField 
                            {...register('nome', {required: true, maxLength: 70})}
                            id="nome"
                            name="nome"
                            defaultValue={content?.nome}
                            onChange={e => setValue('nome', e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        {errors.nome && <FormHelperText error>Campo Nome é obrigatório!</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Disciplina</InputLabel>
                        <AsyncSelect
                            {...register('disciplina', { required: true })}
                            isClearable
                            defaultValue={{value: content?.disciplina.id, label: content?.disciplina.descricao}}
                            loadOptions={getOptionsDisciplinas}
                            onChange={option => {
                                const disciplina = { id: option?.value, descricao: option?.label };
                                setValue('disciplina', disciplina);
                            }}
                        />
                        {errors.disciplina && <FormHelperText error>Campo Disciplina é obrigatório!</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Preceptor</InputLabel>
                        <AsyncSelect
                            {...register('preceptor', { required: true })}
                            isClearable
                            defaultValue={{value: content?.preceptor.id, label: content?.preceptor.nome}}
                            loadOptions={getOptionsPreceptores}
                            onChange={option => {
                                const preceptor = { id: option?.value, nome: option?.label };
                                setValue('preceptor', preceptor);
                            }}
                        />
                        {errors.preceptor && <FormHelperText error>Campo Preceptor é obrigatório!</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Local</InputLabel>
                        <AsyncSelect
                            {...register('campoEstagio', { required: true })}
                            isClearable
                            defaultValue={{value: content?.campoEstagio.id, label: content?.campoEstagio.nome}}
                            loadOptions={getOptionsCampos}
                            onChange={option => {
                                const campo = { id: option?.value, nome: option?.label };
                                setValue('campoEstagio', campo);
                            }}
                        />
                        {errors.campoEstagio && <FormHelperText error>Campo Local é obrigatório!</FormHelperText>}
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
                            {...register('turno', {required: true})}
                            id="turno"
                            label="Turno"
                            defaultValue={content?.turno}
                            onChange={(e) => setValue('turno', e.target.value)}
                            required
                            fullWidth>
                                <MenuItem value={'manha'}>Manhã</MenuItem>
                                <MenuItem value={'tarde'}>Tarde</MenuItem>
                                <MenuItem value={'noite'}>Noite</MenuItem>
                        </Select>
                        {errors.turno && <FormHelperText error>Campo Turno é obrigatório!</FormHelperText>}
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