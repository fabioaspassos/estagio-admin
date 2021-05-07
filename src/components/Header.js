import React from 'react'
import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

import { useAuth } from '../providers/AuthProvider';

const useStyles = makeStyles( theme => ({
    root:{
        backgroundColor: '#fff',
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor:'#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}));

export default function Header() {
    const classes = useStyles();
    const { user, setUser } = useAuth();

    const logoff = () => setUser({
        login: "", 
        token: "", 
        signed: false
    });

    return (
        <AppBar position='static' className={classes.root}>
            <Toolbar>
                <Grid container alignItems='center'>
                    <Grid item>
                        <InputBase 
                            placeholder='Search topics'
                            className={classes.searchInput}
                            startAdornment={ <SearchIcon fontSize='small'/> } />
                    </Grid>
                    <Grid item sm/>
                    <Grid item>
                        {/* <IconButton>
                            <Badge badgeContent={4} color='secondary'>
                                <NotificationsNoneIcon fontSize='small' />   
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color='primary'>
                                <ChatBubbleOutlineIcon fontSize='small' />   
                            </Badge>
                        </IconButton> */}
                        <IconButton onClick={logoff}>
                            <Badge>
                                <PowerSettingsNewIcon fontSize='small' />   
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
