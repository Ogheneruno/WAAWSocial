import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Timeline from './components/pages/timeline/Timeline';
import { Toaster } from 'react-hot-toast';
import VerifyUser from './components/pages/auth/VerifyUser';
import Profile from './components/pages/profile/Profile';


function App() {
  
  

  return (
  <>
 
    <Router>
      <Switch>
        <Route exact path="/" component={Timeline}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component= {Register}></Route>
        <Route path="/verify-user" component= {VerifyUser}></Route>
        <Route path="/profile" component= {Profile}></Route>

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
