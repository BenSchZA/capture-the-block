/**
 *
 * MatchVisualisation
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { ApplicationRootState } from 'types';
import Map from '../../components/Map';

interface OwnProps {}

interface DispatchProps {}
interface StateProps {}

type Props = DispatchProps & OwnProps & StateProps;

const MatchVisualisationContainer: React.SFC<Props> = (props: Props) => {
  return <Map />
};

const mapStateToProps = (state: ApplicationRootState): StateProps => {
  return {
    ...state.captureTheBlock.match,
  };
}

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(MatchVisualisationContainer);
