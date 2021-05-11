import React, { useState } from "react";
import { 
    Grid,
    TextField,
    Button,
    Typography
} from "@material-ui/core";
import axios from 'axios';
import {useForm} from 'react-hook-form';

import {useStyles} from './login.styles';
import Notification from "../../components/Notification";
import {authenticate} from "../../services/userService";
import { useAuth } from '../../providers/AuthProvider';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const styles = useStyles();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { user, setUser } = useAuth();


    const validLogin = async (data) => {
        console.log(`>validLogin user: ${data}`);
        await authenticate(
            data,
            res => {
                setUser({ ...res.data, signed: true});
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            },
            err => {
                setNotify({
                    isOpen: true,
                    message: 'Erro ao logar',
                    type: 'error'
                });
                setUser({
                    login: "", 
                    token: "",
                    signed: false
                });
            }
        );
    }

    return (
        <>
        <Grid className={styles.pageContent}>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <form onSubmit={handleSubmit(validLogin)}>
                <Typography 
                        variant='h6'
                        component='div'>{user?.login}</Typography>

                    <TextField
                        margin="normal"
                        {...register('login')}
                        required
                        fullWidth
                        id="login"
                        label="login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        {...register('password')}
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button type="submit" fullWidth variant="contained">
                        Confirmar
                    </Button>
                </form>
            </Grid>
        </Grid>
        </Grid>
        <Notification
            notify={notify}
            setNotify={setNotify}/>
        </>            
    );
}
