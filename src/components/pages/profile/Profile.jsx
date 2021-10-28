import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import MainWrapper from '../mainWrapper/MainWrapper';
import './profile.css';
import Share from '../../Share';



const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(10),
        [theme.breakpoints.down("sm")]: {
            paddingTop: theme.spacing(8)
        }
    }
}))

const Profile = () => {
    const classes = useStyles();


    return (
        <div className="profile">
            <MainWrapper>
                <Container className={classes.container}>
                    <Share />
                    hghfjf
                </Container>
            </MainWrapper>
        </div>
    )
}

export default Profile;
