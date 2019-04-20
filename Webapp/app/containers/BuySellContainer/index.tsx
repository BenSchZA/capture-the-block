/**
 *
 * BuySellContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import BuySellControl from 'components/BuySellControl';
import * as actions from '../../domain/captureTheBlock/actions';

interface OwnProps {
  side: number,
}

interface DispatchProps {
  onBuyClick(): void;
  onSellClick(): void;
}

interface StateProps { }

type Props = DispatchProps & OwnProps & StateProps;

const BuySellContainer: React.SFC<Props> = ({ side, onBuyClick, onSellClick }: Props) => {
  return <BuySellControl
    side={side}
    onBuyClick={onBuyClick}
    onSellClick={onSellClick} />;
};

const mapDispatchToProps = (dispatch: Dispatch, { side }: OwnProps): DispatchProps => ({
  onBuyClick: () => dispatch(actions.buyTokenAction.request(side)),
  onSellClick: () => dispatch(actions.sellTokenAction.request(side)),
});


const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(BuySellContainer);
