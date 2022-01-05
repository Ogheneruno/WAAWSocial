import { Avatar, Badge } from '@material-ui/core'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import './chatOnline.css'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("http://localhost:7000/api/v1/user/friends/" + currentId);
            setFriends(res.data.friendList);
        };
        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`https://localhost:7000/api/v1/conversations/find/${currentId}/${user.user._id}`);
            setCurrentChat(res.data.conversation)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='chatonline'>
            {onlineFriends.map(onlineFriend => (
                <div className="chatOnlineFriend" onClick={() => handleClick(onlineFriend)}>
                    <div className="chatOnlineImgContainer">
                        <Avatar className="chatOnlineImg" src={onlineFriend?.avatar ? onlineFriend.avatar : ''} alt='chatOnlineImg' />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{onlineFriend?.username}</span>
                </div>
            ))}
        </div>
    )
}

export default ChatOnline
