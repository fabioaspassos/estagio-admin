import React from 'react'
import { AppBar, Badge, Grid, IconButton, InputBase, Toolbar } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export default function Header() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Grid container>
                    <Grid item>
                        <InputBase />
                    </Grid>
                    <Grid item sm/>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color='secondary'>
                                <NotificationsNoneIcon />   
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color='primary'>
                                <ChatBubbleOutlineIcon />   
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge>
                                <PowerSettingsNewIcon />   
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
