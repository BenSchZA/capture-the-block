/*
 *
 * CaptureTheBlock constants
 *
 */

enum ActionTypes {
  START_MATCH_TX_REQUEST = 'capture-the-block/CaptureTheBlock/START_MATCH_TX_REQUEST',
  START_MATCH_TX_SUCCESS = 'capture-the-block/CaptureTheBlock/START_MATCH_TX_SUCCESS',
  START_MATCH_TX_FAILURE = 'capture-the-block/CaptureTheBlock/START_MATCH_TX_FAILURE',
  BUY_TX_REQUEST = 'capture-the-block/CaptureTheBlock/BUY_TX_REQUEST',
  BUY_TX_SUCCESS = 'capture-the-block/CaptureTheBlock/BUY_TX_SUCCESS',
  BUY_TX_FAILURE = 'capture-the-block/CaptureTheBlock/BUY_TX_FAILURE',
  SELL_TX_REQUEST = 'capture-the-block/CaptureTheBlock/SELL_TX_REQUEST',
  SELL_TX_SUCCESS = 'capture-the-block/CaptureTheBlock/SELL_TX_SUCCESS',
  SELL_TX_FAILURE = 'capture-the-block/CaptureTheBlock/SELL_TX_FAILURE',
  CLAIM_TX_REQUEST = 'capture-the-block/CaptureTheBlock/CLAIM_TX_REQUEST',
  CLAIM_TX_SUCCESS = 'capture-the-block/CaptureTheBlock/CLAIM_TX_SUCCESS',
  CLAIM_TX_FAILURE = 'capture-the-block/CaptureTheBlock/CLAIM_TX_FAILURE',
  PRICE_TO_BUY = 'capture-the-block/CaptureTheBlock/PRICE_TO_BUY',
  PRICE_TO_SELL = 'capture-the-block/CaptureTheBlock/PRICE_TO_SELL',
  GET_MATCH = 'capture-the-block/CaptureTheBlock/GET_MATCH',
  GET_MATCH_POOL_BALANCE = 'capture-the-block/CaptureTheBlock/GET_MATCH_POOL_BALANCE',
  GET_BALANCE = 'capture-the-block/CaptureTheBlock/GET_BALANCE',
  MATCH_INDEX = 'capture-the-block/CaptureTheBlock/MATCH_INDEX',
  COLLATERAL_ADDRESS = 'capture-the-block/CaptureTheBlock/COLLATERAL_ADDRESS',
  FETCH_MATCH = 'capture-the-block/CaptureTheBlock/FETCH_MATCHES',
  SET_MATCH = 'capture-the-block/CaptureTheBlock/SET_MATCH',
  FETCH_ALL = 'capture-the-block/CaptureTheBlock/FETCH_ALL',
}

export default ActionTypes;
