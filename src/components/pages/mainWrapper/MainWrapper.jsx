import React from 'react';
import NavBar from '../../Navbar';
import { Grid } from '@material-ui/core';
import Left from '../../Left';
import Right from '../../Right';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import Add from '../../Add';
import { makeStyles } from '@material-ui/core/styles';


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

const MainWrapper = ({children}) => {
  const classes = useStyles();

    return (
      <div>
        <NavBar />
        <Grid container>
          <Grid className={classes.left} item sm={2} xs={2}>
              <Left />
          </Grid>

          <Grid className={classes.center} item sm={7} xs={10}>
            {children}
          </Grid>

          <Grid className={classes.right} item sm={3}>
          <Right />
          </Grid>
        </Grid>
        <Add Icon={ForumRoundedIcon} iconName='chat' color='secondary' />
        <Add Icon={PeopleOutlineRoundedIcon} iconName='friends' color='primary' />
      </div>
    )
}

export default MainWrapper;
