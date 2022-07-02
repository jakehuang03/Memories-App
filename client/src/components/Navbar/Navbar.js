import React, {useState, useEffect} from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import {useDispatch} from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
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
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="icon"
          height="60"
          width="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        { signInButton }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
