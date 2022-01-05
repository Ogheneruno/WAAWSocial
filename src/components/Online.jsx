import { Avatar } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { AuthContext } from '../context/AuthContext';

const Online = () => {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:7000/api/v1/user/friends/"+user.user._id);
        setFriends(friendList.data.friendList);
      } catch (err) {
        console.log(err)
      }
    };
    getFriends();
  }, [user._id])

    return (
      <li className="rightbarFriend">
        {friends.map((friend) => (
          <>
            <Link to={"/profile/"+friend.username} style={{textDecoration: 'none'}}>
              <div className="rightbarProfileImgContainer">
                <Avatar src={friend.avatar ? friend.avatar : ''} alt="" className="rightbarProfileImg" /> 
                <span className="rightbarOnline">Friends</span> 
              </div>
              <span className="rightbarUsername">{friend.username ? friend.username : ''}</span>
            </Link>
          </>
        ))}
            {/* <span className="rightbarUsername">{user.username}</span> */}
      </li>
    )
  }
  
  export default Online;
  