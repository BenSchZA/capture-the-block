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
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatch: dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MatchVisualisationContainer);
