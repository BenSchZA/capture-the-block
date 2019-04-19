/**
 *
 * TxLoadingModal
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles, CircularProgress, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { colors } from 'theme';

const styles = (theme: Theme) => createStyles({

});

interface OwnProps extends WithStyles<typeof styles> {
  pendingTx: boolean;
  txRemaining: number;
  txContext: string;
}

const TxLoadingModal: React.SFC<OwnProps> = (props: OwnProps) => {
  const { classes, pendingTx, txRemaining, txContext } = props;
  return (
  <div>
    <div>
      <div>
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
