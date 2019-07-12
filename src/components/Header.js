import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden
} from '@material-ui/core';

import config from '../config/app';
import logo from '../assets/logo.svg';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <img src={logo} alt="App Logo" />
            <Typography variant="h6" align="center" className="title">
              <Hidden smDown>
                {config.app_full_name}
              </Hidden>
              <Hidden mdUp xsDown>
                {config.app_short_name}
              </Hidden>
            </Typography>
            <ConnectedRouter history={this.props.history}>
              <Link to="/">
                <Button>Home</Button>
              </Link>
              <Link to="/admin">
                <Button>Admin</Button>
              </Link>
            </ConnectedRouter>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;