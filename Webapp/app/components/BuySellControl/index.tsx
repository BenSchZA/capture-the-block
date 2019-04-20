/**
 *
 * BuySell
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography, Grid, Button } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
  });

interface OwnProps extends WithStyles<typeof styles> {
  side: number;
  onBuyClick(side: number): void;
  onSellClick(side: number): void;
}

const BuySellControl: React.SFC<OwnProps> = ({ side, onBuyClick, onSellClick }: OwnProps) => {
  return <Grid container>
    <Grid item xs={12}>
      <Typography>Side {side}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Button variant='contained' onClick={() => onBuyClick(side)}>Buy</Button>
    </Grid>
    <Grid item xs={6}>
      <Button variant='contained' onClick={() => onSellClick(side)}>Sell</Button>
    </Grid>
  </Grid>;
};

export default withStyles(styles, { withTheme: true })(BuySellControl);
