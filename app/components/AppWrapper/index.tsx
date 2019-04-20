import { Avatar, Button, Divider, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { appRoute } from 'containers/App/routes';
import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NetworkState from 'components/NetworkState';

const styles = ({ palette, breakpoints, spacing, zIndex, mixins }: Theme) => createStyles({

});

interface Props extends WithStyles<typeof styles> {
  networkId: number,
  networkReady: boolean,
  ethAddress: string,
}

class AppWrapper extends React.Component<Props> {
  public state = {
    open: false,
  };

  public handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  public close = () => {
    this.setState({ open: false });
  };

  public render() {
    const { networkId, networkReady, classes, children, ethAddress } = this.props;
    return (
      <div>
        <Fragment>
          <AppBar
            position="fixed">
            <Toolbar disableGutters={true}>
              {
                this.state.open ?
                  <IconButton
                    color="inherit"
                    aria-label="Close drawer"
                    onClick={this.handleDrawerToggle} >
                    <ChevronLeftIcon />
                  </IconButton> :
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle} >
                    <MenuIcon />
                  </IconButton>
              }
              <Typography>Capture the Block</Typography>
              <Typography>{ethAddress}</Typography>
            </Toolbar>
          </AppBar>
        </Fragment>
        <main>
          {children}
        </main>
        <NetworkState networkId={networkId} ready={networkReady}></NetworkState>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppWrapper);
