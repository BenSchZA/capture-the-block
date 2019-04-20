import { Theme, WithStyles, Grid } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { compose } from 'redux';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({

});

interface OwnProps extends WithStyles<typeof styles> {

}

const MainPage: React.FunctionComponent<OwnProps> = (props: OwnProps) =>{
  const { classes } = props;

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>Graph goes here</Grid>
            <Grid item xs={6}>Red controls go here</Grid>
            <Grid item xs={6}>Blue controls go here</Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          Transaction history goes here
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default compose(
  withStyles(styles, { withTheme: true }),
)(MainPage);
