import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card, 
        CardHeader, 
        CardMedia, 
        CardContent, 
        CardActions, 
        Collapse, 
        Avatar, 
        IconButton, 
        Typography,
        Badge} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  root: {
        marginBottom: theme.spacing(4)
    },
  media: {
    maxHeight: '500px',
    objectFit: 'contain',
    // height: 'auto',
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard({data}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [like, setLike] = useState(data.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState(data.comments.length);
  const [isCommented, setIsCommented] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(data.likes.includes(user.user._id))
  }, [user.user._id, data.likes])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likeHandler = async () => {
    try {
      await axios.put("http://localhost:7100/api/v1/post/"+data._id+"/like", { userId: user.user._id });
      if (data.success) toast.success(data.msg);
    } catch (err) {
      
    }
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
  }

  const commentHandler = () => {
    // setComment(isCommented ? comment-1 : comment+1);
    setIsCommented(!isCommented);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/profile/${data.user.username}`} style={{textDecoration: 'none'}}>
            <Avatar src={data.user ? data.user.avatar : ''} className={classes.avatar} />
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.user.username}
        subheader={format(data.createdAt)}
      />

        {
          data.mediaType === 'Image' ? (
            <CardMedia
            className={classes.media}
            component="img"
            src={
              data.media
            }
            title={data.description}
          />
          ) : data.mediaType === 'Video' ?
           (<CardMedia
            className={classes.media}
            component = 'video'
            controls
            autoplay
            src={
              data.media
            }
            title={data.description}
          />) : null
        }

      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={likeHandler} aria-label="like a post">
          <Badge badgeContent={like} color="primary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={commentHandler} aria-label="comment">
          <Badge badgeContent={comment} color="primary">
            <CommentIcon />
          </Badge>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            
          </Typography>
          <Typography paragraph>
            
          </Typography>
          <Typography paragraph>
            
          </Typography>
          <Typography>
            
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
