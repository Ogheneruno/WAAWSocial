import './messenger.css';
import Navbar from '../../Navbar';
import { Button, Input, TextField } from '@material-ui/core';
import Conversation from '../../conversations/Conversation';
import Message from '../../message/Message';
import ChatOnline from '../../chatOnline/ChatOnline';
import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { io } from 'socket.io-client';

const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:7000/api/v1");
        socket.current.on("getMessage", message => {
            setReceivedMessage({
                sender: message.senderId,
                text: messages.text,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        receivedMessage && currentChat?.members.includes(receivedMessage.sender) && setMessages((prev) => [...prev, receivedMessage])
    }, [receivedMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user.user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(user.followings.filter(following => users.some(user.userId === following)));
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:7000/api/v1/conversations/" + user.user._id);
                setConversations(res.data.conversation);
            } catch (err) {
                console.log(err)
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:7000/api/v1/messages/"+currentChat?._id);
                setMessages(res.data.messages);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages()
    }, [currentChat]);

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== user.user._id);

        socket.current.emit("senMessage", {
            senderId: user.user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("http://localhost:7000/api/v1/messages/", message);
            setMessages([...messages, res.data.savedMessage]);
            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [messages])


    return (
        <>
            <Navbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <Input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map(conversation => (
                            <div onClick={() => setCurrentChat(conversation)}>
                                <Conversation conversation={conversation} currentUser={user.user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                            (
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map(message => (
                                            <div ref={scrollRef}>
                                                <Message message={ message } own={ message.sender === user._id } />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <TextField 
                                            className="chatMessageInput" 
                                            placeholder="write something..." 
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                        ></TextField>
                                        <Button className="chatSubmitButton" onClick={handleSend}>Send</Button>
                                    </div>
                                </>
                            ) : (
                                <span className='noCoversationText'>Open a conversation to start a chat.</span>
                            )
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user.user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
