import React, {useState} from 'react';
import {
    alpha,
    AppBar,
    Avatar, 
    Toolbar, 
    IconButton, 
    Typography, 
    InputBase, 
    Badge,
    makeStyles, 
    MenuItem} from '@material-ui/core';
import { Cancel, Mail, Notifications, Search } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        
    },

    search: {
        paddingLeft: '5px',
        paddingRight: '5px',
        disply: 'flex',
        alignItems: 'center',
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
        },

        borderRadius: theme.shape.borderRadius,
        width: '30%',
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.show ? "flex": "none"),
        }
    },

    input: {
        color: 'white',
        marginLeft: theme.spacing(1)
    },

    cancel: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },

    icons: {
        display: (props) => (props.show ? "none": 'flex'),
        alignItems: 'center'
    },

    searchButton: {
        marginRight: theme.spacing(2),
        cursor: 'pointer',
        [theme.breakpoints.up("md")]: {
            display: 'none'
        }
    },

    badge: {
        marginRight: theme.spacing(2),
        cursor: 'pointer'
    }
}));


export default function NavBar() {
    const [show, setShow] = useState(false);
    const classes = useStyles({show});

  return (
    <AppBar>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" noWrap>
                WAAWSocial
            </Typography>
            <div className={classes.search}>
                <Search />
                <InputBase className={classes.input} placeholder="Search ..." />
                <Cancel 
                    className={classes.cancel}
                    onClick={() => setShow(false)}
                />
            </div>

            <div className={classes.icons}>
                <Search 
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
                />
            </div>

        </Toolbar>
    </AppBar>
  )
}
