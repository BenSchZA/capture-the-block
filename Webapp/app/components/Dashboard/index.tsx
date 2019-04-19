import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { compose } from 'redux';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({

});

interface OwnProps extends WithStyles<typeof styles> {
  classes: any;
}

const Dashboard: React.FunctionComponent<OwnProps> = (props: OwnProps) =>{
  const { classes } = props;

  return (
    <Fragment>
      Dashboard
    </Fragment>
  );
}

export default compose(
  withStyles(styles, { withTheme: true }),
)(Dashboard);
