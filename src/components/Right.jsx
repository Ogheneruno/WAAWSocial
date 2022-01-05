import { Container, makeStyles, Typography, Avatar, Button } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Users } from '../dummyData';
import Online from './Online';
import { AuthContext } from '../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
import { useEffect } from 'react';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(10),
        position: 'sticky',
        top: 0
    },
    title: {
        marginBottom: '10px',
    },
    rightbarFriendList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
    },
    rightbarFollowButton: {
        backgroundColor: '#1872f2',
        color: 'white',
        '&:hover': {
            color: '#1872f2'
        }
    }
}))

const Right = ({user}) => {
    const classes = useStyles();
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.user.followings.includes(user?.id));


    useEffect(() => {
        setFollowed(currentUser.user.followings.includes(user?.id))
    }, [currentUser])

    const followHandler = async () => {
        try {
            if(followed) {
                await axios.put("http://localhost:7000/api/v1/user/"+currentUser.user._id+"/unfollow", {headers: {
                    'content-type': 'application/json',
                    'access-token': user ? user.token : ""
                    }
                }, {userId: currentUser.user._id});
                dispatch({type: "UNFOLLOW", payload: user._id});
            } else {
                await axios.put("http://localhost:7000/api/v1/user/"+currentUser.user._id+"/follow", {headers: {
                    'content-type': 'application/json',
                    'access-token': user ? user.token : ""
                    }
                }, {userId: currentUser.user._id});
                dispatch({type: "FOLLOW", payload: user._id});
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed);
    }

    return (

        <Container className={classes.container}>
            {currentUser.username !== currentUser.username && (
                <Button className={classes.rightbarFollowButton} onClick={followHandler}>
                    {followed ? "unFollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                </Button>
            )}
            <Typography className={classes.title}>
                Online Friends
            </Typography>

            <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>

            <ul className={classes.rightbarFriendList}>
                {Users.map(u => (
                    <Online key={u.id} user={u} />
                ))}
            </ul>

        </Container>
    )
}

export default Right;
