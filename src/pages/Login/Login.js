import React from "react";
import { 
    Grid,
    TextField,
    Button
} from "@material-ui/core";
import {useStyles} from './login.styles';
import {useForm} from 'react-hook-form';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const styles = useStyles();

    const onSubmit = (data) => {
        console.log(`Chamada para login: ${JSON.stringify(data)}`);
    }

    return (
        <Grid className={styles.pageContent}>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        {...register('email')}
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
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
    );
}
