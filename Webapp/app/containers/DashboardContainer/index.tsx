/**
 *
 * DashboardContainer
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import selectDashboardContainer from './selectors';
import Dashboard from 'components/Dashboard';
import Map from 'components/Map';

interface OwnProps {}

interface DispatchProps {}

interface StateProps {

}

type Props = StateProps & DispatchProps & OwnProps;

const DashboardContainer: React.SFC<Props> = (props: Props) => {
  const { } = props;
  return (
    <Fragment>
      <Dashboard />
      <Map />
    </Fragment>
  );
};

const mapStateToProps = selectDashboardContainer;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch: dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer<OwnProps>({
  key: 'dashboard',
  reducer: reducer,
});

const withSaga = injectSaga<OwnProps>({
  key: 'dashboard',
  saga: saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardContainer);
