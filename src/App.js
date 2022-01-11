import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Timeline from './components/pages/timeline/Timeline';
import { Toaster } from 'react-hot-toast';
import VerifyUser from './components/pages/auth/VerifyUser';
import Profile from './components/pages/profile/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Redirect } from 'react-router-dom';
import Messenger from './components/pages/messager/Messenger';


function App() {
  const { user } = useContext(AuthContext);
  

  return (
  <>
 
    <Router>
      <Switch>
        <Route exact path="/" component={Timeline}>{user ? <Timeline /> : <Register />}</Route>
        <Route path="/login" component={Login}>{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register" component= {Register}>{user ? <Redirect to="/" /> : <Register />}</Route>
        <Route path="/messenger" component= {Messenger}>{!user ? <Redirect to="/" /> : <Messenger />}</Route>
        <Route path="/verify-user" component= {VerifyUser}></Route>
        <Route path="/profile/:username" component= {Profile}></Route>
      </Switch>
    </Router>
    
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 5000,
        success: {
          style: {
            background: 'green',
            color: 'white'
          },
        },
        error: {
          style: {
            background: 'red',
            color: 'white'
          },
        },
      }}
    />

  </>
  );
}

export default App;
