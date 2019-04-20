/**
 *
 * BuySellContainer
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import BuySellControl from 'components/BuySellControl';
import { ApplicationRootState } from 'types';

interface OwnProps {
  side: number,
}

interface DispatchProps {}

interface StateProps {}

type Props = DispatchProps & OwnProps & StateProps;

const BuySellContainer: React.SFC<Props> = ({side}: Props) => {
  return <BuySellControl 
    side={side} 
    onBuyClick={() => {console.log('buy')}}
    onSellClick={() => {console.log('sell')}}/>;
};

const mapStateToProps = (state:ApplicationRootState, props: OwnProps): StateProps => {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    dispatch: dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BuySellContainer);
