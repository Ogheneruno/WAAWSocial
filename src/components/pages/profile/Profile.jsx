import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { Avatar, Container, makeStyles } from '@material-ui/core';
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
    const { user } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    // const [userFetch, setUserFetch] = useState({});

    const getUserPosts = async () => {
        let res = await axios.get("http://localhost:7100/api/v1/post/userId", {headers: {
                'content-type': 'application/json',
                'access-token': user ? user.token : ""
            }
        });

        setUserPosts(res.data.userPosts);
    }

    useEffect(() => {
        getUserPosts();
    }, [])

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const response = await axios.get(`http://localhost:7000/api/v1/user?username=ogheneruno`, {headers: {
    //             'content-type': 'application/json',
    //             'access-token': user ? user.token : ""
    //             }
    //         });
    //         setUserFetch(response.data);
    //         console.log(response.data)
    //     }
    //     fetchUser();
    // }, [])

    return (
        <div className="profile">
            <MainWrapper>
                <Container className={classes.container}>
                    <div className="profileWrapper">
                        <div className="profileImages">
                            <Avatar className="coverPicture" src={user.user.coverPicture} alt="Cover Photo" />
                            <Avatar className="profilePicture" src={user.user.avatar} alt="Profile Picture" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.user.username}</h4>
                            <span className="profileInfoDesc">{user.user.desc}</span>
                        </div>
                    </div>
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
