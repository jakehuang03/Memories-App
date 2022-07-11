import React, {useState, useEffect} from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import useStyles from "./styles";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import {useDispatch} from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  //console.log(user);

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/auth');
    setUser(null);
  }

  useEffect(() => {
    if(user?.exp) {
      if (user.exp * 1000 < new Date().getTime()) logout();
    }
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])

  let signInButton;
  if (user?.result)  {
    signInButton = 
    <div className={classes.profile}>
      <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
      <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
      <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
    </div>
  } 
  else if(user?.sub) {
      signInButton = 
      <div className={classes.profile}>
        <Avatar className={classes.purple} alt={user?.name} src={user?.picture}>{user?.name.charAt(0)}</Avatar>
        <Typography className={classes.userName} variant="h6">{user?.name}</Typography>
        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
      </div>
  } 
  else {
      signInButton = <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
  }
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px"/>
        <img
          className={classes.image} src={memoriesLogo} alt="icon" height="40px"/>
      </Link>
      <Toolbar className={classes.toolbar}>
        { signInButton }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
