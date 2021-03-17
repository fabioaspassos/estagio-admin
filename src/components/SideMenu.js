import React from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core'

const styles = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '200px',
        height: '100%',
        backgroundColor: '#253053',
      }
}
const SideMenu = (props) => {
    const { classes } = props;

    return (
        <div className={classes.sideMenu}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/employees">Employees</Link>
                    </li>
                    <li>
                        <Link to="/groups">Grupos</Link>
                    </li>                    
                </ul>
            </nav>
        </div>
    )
}

export default withStyles(styles)(SideMenu);