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

interface OwnProps {}

interface DispatchProps {}

interface StateProps {}

type Props = DispatchProps & OwnProps & StateProps;

const BuySellContainer: React.SFC<Props> = (props: Props) => {
  return <BuySellControl />;
};

const mapStateToProps = (state:ApplicationRootState, props: OwnProps): StateProps => {
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

export default compose(withConnect)(BuySellContainer);
