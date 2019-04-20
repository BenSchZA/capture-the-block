import { Theme, WithStyles, Grid } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { compose } from 'redux';
import MatchVisualisationContainer from 'containers/MatchVisualisationContainer';
import TransactionHistoryContainer from 'containers/TransactionHistoryContainer';
import BuySellContainer from 'containers/BuySellContainer';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({

});

interface OwnProps extends WithStyles<typeof styles> {

}

enum Side {
  LEFT,
  RIGHT
}

interface Player {
  side: Side,
  progress: Number,
}

const MainPage: React.FunctionComponent<OwnProps> = (props: OwnProps) =>{
  const { classes } = props;

  const players: Array<Player> = [];

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}><MatchVisualisationContainer /></Grid>
            <Grid item xs={6}><BuySellContainer side={0} /></Grid>
            <Grid item xs={6}><BuySellContainer side={1} /></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TransactionHistoryContainer />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default compose(
  withStyles(styles, { withTheme: true }),
)(MainPage);
