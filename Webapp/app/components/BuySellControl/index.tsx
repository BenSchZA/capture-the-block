/**
 *
 * BuySell
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography, Grid, Button } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    buttonBuy: {
      textAlign: 'right',
      padding: '20px',
    },
    buttonSell: {
      textAlign: 'left',
      padding: '20px',
    },
    centerText: {
      textAlign: 'center',
    },
    gridContainer: {
      marginTop: '20px',
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  side: number;
  buyPrice: number;
  sellPrice: number,
  onBuyClick(side: number): void;
  onSellClick(side: number): void;
}

const BuySellControl: React.SFC<OwnProps> = ({ classes, side, onBuyClick, onSellClick, buyPrice, sellPrice }: OwnProps) => {

  return <Grid container className={classes.gridContainer}>
    <Grid item xs={12} className={classes.centerText}>
      <Typography variant={'h5'}>Side {side}</Typography>
    </Grid>
    <Grid item xs={6} className={classes.buttonBuy}>
      <Button variant={'contained'} onClick={() => onBuyClick(side)}>{`Buy for $${buyPrice}`}</Button>
    </Grid>
    <Grid item xs={6} className={classes.buttonSell}>
      <Button variant={'contained'} onClick={() => onSellClick(side)}>{`Sell for $${sellPrice}`}</Button>
    </Grid>
  </Grid>;
};

export default withStyles(styles, { withTheme: true })(BuySellControl);
