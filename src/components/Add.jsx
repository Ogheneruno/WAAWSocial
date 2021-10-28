import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles(theme => ({
    fabino: {
        position: 'fixed',
    },

    chat: {
        bottom: 20,
        right: 23
    },

    friends: {
        bottom: 90,
        right: 23
    },

    post: {
        bottom: 160,
        right: 23
    }

}));


const Add = ({Icon, iconName, color}) => {
    const classes = useStyles();

    return (
        <Fab className={
            `${classes.fabino}
             ${iconName === 'post' ? classes.post : iconName === 'chat' ? classes.chat : classes.friends }`
        } color={
            color === 'secondary' ? 'secondary' : color === 'default' ? 'default' : 'primary'
        } aria-label="add">
            <Icon />
        </Fab>
    )
}

export default Add
