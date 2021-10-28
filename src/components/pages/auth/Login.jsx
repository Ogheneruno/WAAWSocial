import React, { useContext, useRef } from 'react';
import axios from 'axios';
import './register.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import { loginCall } from '../../../apiCalls';




const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '85%',
      },
    },

    btn1: {
        backgroundColor: '#3f51b5',
        color: '#fff',
        fontWeight: 'bold',
        width: '100%',
        padding: '10px',
        maxWidth: '30%',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: 'rgb(13, 136, 136)',
            color: '#fff',
        }
    }

  }));



const Login = () => {
    const classes = useStyles();
    const userInput = useRef();
    const password = useRef();
    const{ isFetching, dispatch } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userInput.current.value) return toast.error('Username is required.');
        if(!password.current.value) return toast.error('Password is required.');

        const user = {
            userInput: userInput.current.value,
            password: password.current.value,
        }

        loginCall(user, dispatch);
  
    }

    return (
        <div className="register">
            <div className="holder">
                <h3>User Login</h3>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">

                    <TextField id="outlined-basic" type="text" label="Username or Email" variant="outlined" inputRef={userInput} />
                    <TextField id="outlined-basic" type="password" label="Password" variant="outlined" inputRef={password} />

                    <Button type={'submit'} className={classes.btn1} variant="contained">
                        Login
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default Login;
