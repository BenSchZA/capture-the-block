import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { Fragment } from 'react';
import NetworkState from 'components/NetworkState';

const styles = ({ spacing, zIndex }: Theme) => createStyles({
  root: {
    display: 'flex',
    backgroundColor: '#00b5bd',
  },
  appBar: {
    zIndex: zIndex.drawer + 1,
    background: '#01223b',
  },
  appHeadingLeft: {
    flexGrow: 1,
    textAlign: 'left',
    color: 'white',
    paddingLeft: spacing.unit*2,
  },
  appHeadingRight: {
    flexGrow: 1,
    textAlign: 'right',
    color: 'white',
    paddingRight: spacing.unit*2,
  },
  content: {
    flexGrow: 1,
    minHeight: '100vh',
    padding: `${spacing.unit * 9}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
  },
});

interface Props extends WithStyles<typeof styles> {
  networkId: number,
  networkReady: boolean,
  ethAddress: string,
}

class AppWrapper extends React.Component<Props> {
  public render() {
    const { networkId, networkReady, classes, children, ethAddress } = this.props;
    return (
      <div className={classes.root}>
        <Fragment>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar disableGutters={true}>
              <Typography className={classes.appHeadingLeft}>Capture the Block</Typography>
              <Typography className={classes.appHeadingRight}>{ethAddress}</Typography>
            </Toolbar>
          </AppBar>
        </Fragment>
        <main className={classes.content}>
          {children}
        </main>
        <NetworkState networkId={networkId} ready={networkReady}></NetworkState>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppWrapper);
