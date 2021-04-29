import {
    makeStyles
} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    addButton: {
        padding: theme.spacing(0, 2),
        float: 'right',
        transform: 'scale(2.5)'
    },
    detailsButton: {
        padding: theme.spacing(0, 2),
        float: 'right',
        transform: 'scale(1.5)'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    card: {
        maxWidth: 800
    },
    topTittle: {
        marginBottom: theme.spacing(4)
    },
    addButtonInfo: {
        padding: theme.spacing(0, 2),
        display: 'block',
        marginLeft: 'auto'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    autocompleteStudent: {
        paddingBottom: theme.spacing(20)
    }
}));
