import React, { useContext } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    display: 'none',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '3rem',
    fontWeight: 600,
    // fontFamily: 'Oxygen', 'Courier monospace',
    fontSize: '2rem',
    textTransform: 'uppercase',
  }
}));

export default function NavBar() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = async () => {
    localStorage.removeItem("user");
    window.location.href = "/login";    
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
          user ?
          <>
            <MenuItem onClick={() => history.push(`/profile/${user.user.username}`)}>Profile</MenuItem>
            <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
          </> :
          <>
            <MenuItem onClick={() => history.push('/login')}>Login</MenuItem>
            <MenuItem onClick={() => history.push('/register')}>Register</MenuItem>
          </>
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
        <Avatar 
            alt="User Image"
            src={
                user
                ? user.user.avatarSmall
                : ""
            }
        />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
              <span className={classes.logo}>WS</span>
            </Link>
            {/* <MenuIcon /> */}
          </IconButton>
          <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography className={classes.title} variant="h6" noWrap>
              WAAW Social
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for friend, post or video…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
            <Avatar 
                    alt="User Image"
                    src={
                        user
                        ? user.user.avatarSmall
                        : ""
                    }
            />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <FormatAlignRightIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}












// import React, {useState} from 'react';
// import {
//     alpha,
//     AppBar,
//     Avatar, 
//     Toolbar, 
//     IconButton, 
//     Typography, 
//     InputBase, 
//     Badge,
//     makeStyles, 
//     MenuItem} from '@material-ui/core';
// import { Cancel, Mail, Notifications, Search } from '@material-ui/icons';

// const useStyles = makeStyles(theme => ({
//     toolbar: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         backgroundColor: alpha(theme.palette.common.white, 0.15),
        
//     },

//     search: {
//         paddingLeft: '5px',
//         paddingRight: '5px',
//         disply: 'flex',
//         alignItems: 'center',
//         "&:hover": {
//             backgroundColor: alpha(theme.palette.common.white, 0.25)
//         },

//         borderRadius: theme.shape.borderRadius,
//         width: '30%',
//         [theme.breakpoints.down("sm")]: {
//             display: (props) => (props.show ? "flex": "none"),
//         }
//     },

//     input: {
//         color: 'white',
//         marginLeft: theme.spacing(1)
//     },

//     cancel: {
//         [theme.breakpoints.up('md')]: {
//             display: 'none'
//         }
//     },

//     icons: {
//         display: (props) => (props.show ? "none": 'flex'),
//         alignItems: 'center'
//     },

//     searchButton: {
//         marginRight: theme.spacing(2),
//         cursor: 'pointer',
//         [theme.breakpoints.up("md")]: {
//             display: 'none'
//         }
//     },

//     badge: {
//         marginRight: theme.spacing(2),
//         cursor: 'pointer'
//     }
// }));


// export default function NavBar() {
//     const [show, setShow] = useState(false);
//     const classes = useStyles({show});

//   return (
//     <AppBar>
//         <Toolbar className={classes.toolbar}>
//             <Typography variant="h6" noWrap>
//                 WAAWSocial
//             </Typography>
//             <div className={classes.search}>
//                 <Search />
//                 <InputBase className={classes.input} placeholder="Search ..." />
//                 <Cancel 
//                     className={classes.cancel}
//                     onClick={() => setShow(false)}
//                 />
//             </div>

//             <div className={classes.icons}>
                
                
//             </div>

//         </Toolbar>
//     </AppBar>
//   )
// }









{/* <Search 
                    className={classes.searchButton}
                    onClick={() => setShow(true)}
                />
                <Badge className={classes.badge}>
                    <Mail />
                </Badge>

                <Badge className={classes.badge}>
                    <Notifications />
                </Badge>

                <Avatar 
                     alt="Ogheneruno Ogefere"
                     src="https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp
                     .net%2Fv%2Ft61.24694-24%2F179765540_214775193430006_1360014387495398562_n
                     .jpg%3Fccb%3D11-4%26oh%3Dc023de2b1c3fd07f27d7073c43dc1c1e%26oe%3D6159AB41&t=l&u=2348188150495%40c
                     .us&i=1619879655&n=JJnR8kMTFPfjRpIOZh%2F4GMXflwukipsEqlVke5m7lmA%3D"
                /> */}
