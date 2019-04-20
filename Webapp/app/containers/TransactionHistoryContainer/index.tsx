/**
 *
 * TransactionHistory
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import TransactionHistory from 'components/TransactionHistory';
import { ApplicationRootState } from 'types';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const TransactionHistoryContainer: React.SFC<Props> = (props: Props) => {
  return <TransactionHistory transactions={[]} />;
};

const mapStateToProps = (state: ApplicationRootState) => {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(TransactionHistoryContainer);
