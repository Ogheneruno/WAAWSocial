import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Post from './Post';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(10),
        [theme.breakpoints.down("sm")]: {
            paddingTop: theme.spacing(8)
        }
    }
}))

const MainFeed = () => {
    const classes = useStyles();
    return (
       <Container className={classes.container}>
           <Post />
           <Post />
           <Post />
           <Post />
           <Post />
           <Post />
           <Post />
       </Container>
    )
}

export default MainFeed
