/**
 *
 * NetworkState
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { colors } from 'theme';

const styles = (theme: Theme) => createStyles({

});

interface OwnProps extends WithStyles<typeof styles> {
  ready: boolean;
  networkId: number;
}

const NetworkState: React.SFC<OwnProps> = (props: OwnProps) => {
  const {classes, ready, networkId} = props;
  let networkName: string = "";
  if(networkId == 1){
    networkName = "Mainnet"
  }else if(networkId == 4){
    networkName = 'Rinkeby'
  }else{
    networkName =  'Not connected'
  }
  return <div>
    <span>
      {networkName}
    </span>
    <div className={ready ? 'ready'  : ''} />
  </div>;
};

export default withStyles(styles, { withTheme: true })(NetworkState);
