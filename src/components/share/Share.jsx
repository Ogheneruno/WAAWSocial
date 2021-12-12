import React, { useContext, useState , useRef, useEffect } from 'react';
import './share.css';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { Cancel, EmojiEmotions, Room } from '@material-ui/icons';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import toast from 'react-hot-toast';
import axios from 'axios';



const Share = () => {
    const { user } = useContext(AuthContext);
    const post = useRef();
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    useEffect(() => {
    }, [image, video])


    const addImage = async (e) => {
        setVideo(null);
        setImage(e.target.files[0]);
        console.log("video:: ",video)

    }

    const addVideo = async (e) => {
        setImage(null);
        setVideo(e.target.files[0]);
        console.log("image::: ", image)

    }

    const submitForm = async (e) => {
        e.preventDefault();

        if (!post.current.value) return toast.error('Please type a post');

        // let newPost = {
        //     description: post.current.value,
        //     mediaType: 'image'
        // }

        const noImageOrVideo = {};

        if (image) {
            const data = new FormData();
            data.append("postMedia", image);
            data.append("description", post.current.value);
            data.append("mediaType", "Image");

            try {
                let postRes = await axios.post('http://localhost:7000/api/v1/post', 
                data,
                {
                    headers: {
                        'content-type': 'application/json',
                        'access-token': user.token
                    }
                });
                if (postRes.data.success) return toast.success(postRes.data.msg);   
            } catch (err) {
                if (!err.response.data.success) return toast.error(err.response.data.msg);   
            }
    
        } else if (video) {
            const data = new FormData();
            data.append("postMedia", video);
            data.append("description", post.current.value);
            data.append("mediaType", "Video");

            try {
                let postRes = await axios.post('http://localhost:7000/api/v1/post', 
                data,
                {
                    headers: {
                        'content-type': 'application/json',
                        'access-token': user.token
                    }
                });
                if (postRes.data.success) return toast.success(postRes.data.msg);   
            } catch (err) {
                if (!err.response.data.success) return toast.error(err.response.data.msg);   
            }
        } else {
            noImageOrVideo.description = post.current.value;
            noImageOrVideo.mediaType = '';

            try {
                let postRes = await axios.post('http://localhost:7000/api/v1/post', 
                noImageOrVideo,
                {
                    headers: {
                        'content-type': 'application/json',
                        'access-token': user.token
                    }
                });
                if (postRes.data.success) return toast.success(postRes.data.msg);   
            } catch (err) {
                if (!err.response.data.success) return toast.error(err.response.data.msg);
            }
    
        }
    }


    return (
        <div className="share">
            <div className="share__wrapper">
                <div className="share__wrapper__top">
                    <Avatar
                     src={
                         user ?
                         user.user.avatarSmall
                         : ''
                     }
                     alt="User"
                     className="share__profile__img"
                    />

                    <input 
                      type="text"
                      placeholder={
                        `What's on your mind ${user ? user.user.username : ''}?`
                      } 
                      className="share__input"
                      ref={post}
                    />

                </div>

                <hr className="share__hr" />

                {
                    image && (
                        <div className="share__preview__container">
                            <img className="share__img__preview" src={URL.createObjectURL(image)} alt=""/>
                            {/* <span >Clear</span> */}
                            <Cancel className="share__cancel" onClick={() => setImage(null)} />
                        </div>
                    )
                }

                { 
                    video && (
                        <div className="share__preview__container">
                            <video className="share__img__preview" src={URL.createObjectURL(video)} controls autoPlay alt=""/>
                            {/* <span >Clear</span> */}
                            <Cancel className="share__cancel" onClick={() => setVideo(null)} />
                        </div>
                    )
                }

                    <form action="" className="share__bottom" onSubmit="submitForm">
                        <div className="share__options">
                            <label htmlFor="media" className="share__option">
                               <PermMediaIcon htmlColor="#3f51b5" className="share__icon" />
                                <span className="share__text">Image</span>
                               <input type="file" id="media" accept="image/*" style={{display:"none"}}
                                onChange={addImage}
                               />
                            </label>

                            <div className="share__option">
                                <label htmlFor="video" className="share__option">
                                    <VideoLibraryIcon type="file" className="share__icon" htmlColor="red" />
                                    <span className="share__text">Video</span>
                                    <input type="file" id="video" accept="video/*" style={{display:"none"}} 
                                        onChange={addVideo}
                                    />
                                </label>
                            </div>

                            <div className="share__option">
                                <Room className="share__icon" htmlColor="blue" />
                                <span className="share__text">Location</span>
                            </div>

                            <div className="share__option">
                                <EmojiEmotions className="share__icon" htmlColor="yellow" />
                                <span className="share__text">Feelings</span>
                            </div>

                        </div>

                        <button className="share__button" onClick={submitForm} type="submit">Post</button>

                    </form>
            </div>
        </div>
    )
}

export default Share;
