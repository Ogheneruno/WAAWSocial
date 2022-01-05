import React, { useState, useEffect, useContext } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Post from './Post';
import Share from './share/Share';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';



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
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    // const getPosts = async () => {
    //     let res = await axios.get("http://localhost:7000/api/v1/post", {headers: {
    //             'content-type': 'application/json',
    //             'access-token': user ? user.token : ""
    //         }
    //     });

    //     setPosts(res.data.allPosts);

    // }

    // useEffect(() => {
    //     getPosts();
    // }, [])

    useEffect(() => {
        const getTimelinePosts = async () => {
        let res = await axios.get("http://localhost:7100/api/v1/post/timeline" + user._id, {headers: {
            'content-type': 'application/json',
            'access-token': user ? user.token : ""
            }
        });

            setPosts(res.data.userPosts.sort((p1, p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt)}));
        }
        getTimelinePosts();
    }, [user._id])


    return (
       <Container className={classes.container}>
           {user.user.username === user.user.username && <Share />}
           {
               posts.map(post => (
                <Post key={post._id} data={post} />
               ))
           }
       </Container>
    )
}

export default MainFeed;
