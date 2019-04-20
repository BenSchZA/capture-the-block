/**
 *
 * TxLoadingModal
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles, CircularProgress, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { colors } from 'theme';
import { red, grey, lightBlue } from '@material-ui/core/colors';

const styles = (theme: Theme) => createStyles({
  modalRoot: {
    display: "block",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    visibility: "hidden",
    opacity: 0,
    zIndex: 99999,
    transitionDuration: "400ms",
    '&::before': {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: 'grey',
      zIndex: -1,
      opacity: 0.5
    },
    "&.active": {
      opacity: 1,
      visibility: "visible"
    }
  },
  infoRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "50%",
      left: "50%",
      height: "100vh",
      width: "100vw",
      transform: "translate(-50%, -50%)",
      background: `radial-gradient(ellipse at center, ${grey} 0%,rgba(242,162,2,0) 80%)`,
      zIndex: -1,
      opacity: 0.8
    }
  },
  spinner: {
    color: '#FFF',
    zIndex: 99999999
  },
  txRemaining: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 20
  },
  txContext: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 20
  }
});

interface OwnProps extends WithStyles<typeof styles> {
  pendingTx: boolean;
  txRemaining: number;
  txContext: string;
}

const TxLoadingModal: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, pendingTx, txRemaining, txContext } = props;
  return (
    <div className={classNames(classes.modalRoot, pendingTx ? "active" : "")}>
      <div className={classes.infoRoot}>
        <div className={classes.spinner}>
          <CircularProgress color={"inherit"} size={80}></CircularProgress>
        </div>
        <Typography component='h4' variant='h4'>
          Transactions remaining: {`${txRemaining}`}
        </Typography>
        <Typography component='h4' variant='h4'>
          {`${txContext}`}
        </Typography>
      </div>
    </div>);
};

export default withStyles(styles, { withTheme: true })(TxLoadingModal);
