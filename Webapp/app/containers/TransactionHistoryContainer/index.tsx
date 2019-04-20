/**
 *
 * TransactionHistory
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import TransactionHistory from 'components/TransactionHistory';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const TransactionHistoryContainer: React.SFC<Props> = (props: Props) => {
  return <TransactionHistory transactions={[]} />;
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatch: dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(TransactionHistoryContainer);
