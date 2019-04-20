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
import { Match } from 'domain/captureTheBlock/types';

enum Side {
  LEFT,
  RIGHT
}

interface Player {
  side: Side,
  progress: Number,
}

interface OwnProps {}

interface DispatchProps {}
interface StateProps {
  authentication: any,
  transactionManagement: any,
  captureTheBlock: {
    currentIndex: number;
    match: Match;
  }
}

type Props = DispatchProps & OwnProps & StateProps;

const MatchVisualisationContainer: React.SFC<Props> = (props: Props) => {
  const players = props.captureTheBlock.match && 
    props.captureTheBlock.match.sides.map((p, i) => ({side: i, progress: p.totalSupply}))
  return <Map players={players}/>
};

const mapStateToProps = (state: ApplicationRootState): StateProps => {
  return {
    ...state,
  };
}

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(MatchVisualisationContainer);
