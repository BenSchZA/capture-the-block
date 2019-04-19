/*
 *
 * TransactionManagement constants
 *
 */

enum ActionTypes {
  SET_PENDING_STATE = 'capture-the-block/transactionManagement/SET_PENDING_STATE',
  REFRESH_BALANCES = 'capture-the-block/transactionManagement/REFRESH_BALANCES',
  SET_BALANCES = 'capture-the-block/transactionManagement/SET_BALANCES',
  SET_TX_REMAINING_COUNT = 'capture-the-block/transactionManagement/SET_TX_REMAINING_COUNT',
  SET_TX_CONTEXT = 'capture-the-block/transactionManagement/SET_TX_CONTEXT',
}

export default ActionTypes;
