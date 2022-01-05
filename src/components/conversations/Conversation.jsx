import { Avatar } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './conversation.css';

const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios.get("http://localhost:7000/api/v1/user?userId="+friendId);
                setUser(res.data.other);
                console.log(user.avatar)
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className='conversation'>
            <Avatar className='conversationImg' src={ user?.avatar ? user.avatar : '' } alt='conversationImd' />
            <span className="conversationName">{ user?.username }</span>
        </div>
    )
}

export default Conversation
