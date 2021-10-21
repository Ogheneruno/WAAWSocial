import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import NavBar from './components/Navbar';
import { Grid } from '@material-ui/core';
import Left from './components/Left';
import MainField from './components/MainFeed';
import Right from './components/Right'
import Add from './components/Add';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  left: {
    backgroundColor: ''
  },

  center: {
    backgroundColor: ''
  },

  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
  
}));

function App() {
  const classes = useStyles();
  

  return (
  <>
  <div>
    <NavBar />
      <Grid container>
        <Grid className={classes.left} item sm={2} xs={2}>
          <Left />
        </Grid>

        <Grid className={classes.center} item sm={7} xs={10}>
        <MainField />
        </Grid>

        <Grid className={classes.right} item sm={3}>
        <Right />
        </Grid>
    </Grid>
    <Add Icon={AddIcon} iconName='post' color='secondary' />
    <Add Icon={ForumRoundedIcon} iconName='chat' color='default' />
    <Add Icon={PeopleOutlineRoundedIcon} iconName='friends' color='primary' />

  </div>
  <div className="App">
    <h1 className={classes.heading}>Welcome to She Hacks Africa Academy</h1>
    <p className={classes.heading}>Good to know</p>
    <Button variant="outlined" size="small" color="primary">Click me</Button>
  </div>
  </>
  );
}

export default App;
