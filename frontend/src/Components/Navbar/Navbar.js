import { AppBar, Button, Container, Toolbar } from '@material-ui/core'
import {Link} from 'react-router-dom'
import React from 'react';
import logo from '../images/FraudBuster-Logo.png'
import Styles from './Styles';

const Navbar = () => {
  const classes = Styles()
  return (
    <AppBar position='fixed' className={classes.appBar}>
       <Link to="/" ><img src={logo} width="40px" height="40px" alt="logo"></img></Link>
        <Button component={Link} to="/user" className={classes.button} variant='contained' color='primary'>Add user</Button>
    </AppBar>
  )
}

export default Navbar