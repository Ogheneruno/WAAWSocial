import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import MainWrapper from '../mainWrapper/MainWrapper';
import './profile.css';
import Share from '../../share/Share';
import Post from '../../Post';



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
    const { user } = useContext(AuthContext)
    const [userPosts, setUserPosts] = useState([]);

    const getUserPosts = async () => {
        let res = await axios.get("http://localhost:7000/api/v1/post/userId", {headers: {
                'content-type': 'application/json',
                'access-token': user ? user.token : ""
            }
        });

        setUserPosts(res.data.userPosts);
    }

    useEffect(() => {
        getUserPosts();
    }, [userPosts])


    return (
        <div className="profile">
            <MainWrapper>
                <Container className={classes.container}>
                    <Share />                   
                    {
                        userPosts.map(post => (
                            <Post key={post._id} data={post} />
                        ))
                    }
                </Container>
            </MainWrapper>
        </div>
    )
}

export default Profile;
