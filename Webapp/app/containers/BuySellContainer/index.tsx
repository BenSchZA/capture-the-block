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
import { ApplicationRootState } from 'types';

interface OwnProps {
  side: number,
}

interface DispatchProps {
  onBuyClick(): void;
  onSellClick(): void;
}

interface StateProps {
  buyPrice: number;
  sellPrice: number
}

type Props = DispatchProps & OwnProps & StateProps;

const BuySellContainer: React.SFC<Props> = ({ side, onBuyClick, onSellClick, buyPrice, sellPrice }: Props) => {
  return <BuySellControl
    side={side}
    buyPrice={buyPrice}
    sellPrice={sellPrice}
    onBuyClick={onBuyClick}
    onSellClick={onSellClick} />;
};

const mapDispatchToProps = (dispatch: Dispatch, { side }: OwnProps): DispatchProps => ({
  onBuyClick: () => dispatch(actions.buyTokenAction.request(side)),
  onSellClick: () => dispatch(actions.sellTokenAction.request(side)),
});

const mapStateToProps = (state: ApplicationRootState, {side}: OwnProps) => ({
  buyPrice: state.captureTheBlock.match.sides.length > 0 && state.captureTheBlock.match.sides[side] ? state.captureTheBlock.match.sides[side].buyPrice : 0,
  sellPrice: state.captureTheBlock.match.sides.length > 0 && state.captureTheBlock.match.sides[side] ? state.captureTheBlock.match.sides[side].sellPrice : 0,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BuySellContainer);
