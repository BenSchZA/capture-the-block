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
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';

import { DAEMON } from 'utils/constants';

import { forwardTo } from 'utils/history';
import AppWrapper from '../../components/AppWrapper/index';
import routes from './routes';
import saga from './saga';
import TxLoadingModal from 'components/TxLoadingModal';

interface OwnProps { }

interface StateProps {
  isLoggedIn: boolean;
  ethAddress: string;
  profileImage: string;
  displayName: string;
  txPending: boolean;
  txRemaining: number;
  txContext: string;
  networkReady: boolean;
  networkId: number;
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps & OwnProps;
const App: React.SFC<Props> = (props: Props) => {
  const { networkReady, networkId, ethAddress, txPending, txRemaining, txContext } = props;
  return (
    <AppWrapper
      ethAddress={ethAddress}
      networkId={networkId}
      networkReady={networkReady} >
      <TxLoadingModal pendingTx={txPending} txRemaining={txRemaining} txContext={txContext}></TxLoadingModal>
      <Switch>
        {routes.map(r => <Route path={r.path} exact component={r.component} key={r.path} />)}
      </Switch>
    </AppWrapper>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({

});

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
