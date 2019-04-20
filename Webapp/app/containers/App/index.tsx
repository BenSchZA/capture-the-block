/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { compose, Dispatch } from 'redux';
import injectSaga from 'utils/injectSaga';

import { DAEMON } from 'utils/constants';

import AppWrapper from '../../components/AppWrapper/index';
import saga from './saga';
import TxLoadingModal from 'components/TxLoadingModal';

import { Match } from 'domain/captureTheBlock/types';
import MainPage from 'pages/MainPage';
import { Button } from '@material-ui/core';
import { ApplicationRootState } from 'types';
import * as captureTheBlockActions from '../../domain/captureTheBlock/actions';
import { blockchainResources } from 'blockchainResources';

interface OwnProps { }

interface StateProps {
  authentication: {
    ethAddress: string,
  },
  captureTheBlock: {
    match: Match,
  },
  transactionManagement: {
    txPending: boolean,
    txRemaining: number,
    txContext: string,
  }
}

interface DispatchProps {
  startMatch(): void;
}

type Props = StateProps & DispatchProps & OwnProps;
const App: React.SFC<Props> = ({
  captureTheBlock: {
    match: {
      ended
    }
  },
  transactionManagement: {
    txPending,
    txRemaining,
    txContext
  },
  startMatch }: Props) => {
  return (
    <AppWrapper
      ethAddress={blockchainResources.signerAddress}
      networkReady={true}
      networkId={blockchainResources.networkId} >
      <TxLoadingModal pendingTx={txPending} txRemaining={txRemaining} txContext={txContext}></TxLoadingModal>
      <Route path='/' exact component={MainPage} />
      {/* {ended ?
        <Button onClick={startMatch}>Start Match</Button> :
        <Route path='/' exact component={MainPage} />
      } */}
    </AppWrapper>
  );
};

const mapStateToProps = (state: ApplicationRootState) => ({
  ...state,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startMatch: () => dispatch(captureTheBlockActions.startMatchAction.request({ numberOfSides: 2, targetSupply: 15, gradient: 3 }))
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga<OwnProps>({ key: 'global', saga: saga, mode: DAEMON });

export default compose(
  withRouter,
  withSaga,
  withConnect,
)(App);
