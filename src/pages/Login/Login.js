import React from "react";
import {useStyles} from "../Estagio/estagio.styles";
import { 
    Grid, 
    Container, 
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Link
} from "@material-ui/core";
import {useForm} from 'react-hook-form';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export default function Login() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (values) => {
        console.log(`Chamada para login: ${JSON.stringify(values)}`);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Box sx={{width: '100%', mt: 1,}}>
                    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Confirmar
                        </Button>
                    </form>
                     <Grid container>
                         <Grid item xs>
                             <Link href="#" variant="body2">
                                 Esqueceu a senha?
                             </Link>
                         </Grid>
                     </Grid>
                 </Box>
             </Box>
       </Container>
    );
}