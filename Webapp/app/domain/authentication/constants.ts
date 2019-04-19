/*
 *
 * Auth constants
 *
 */

enum ActionTypes {
  AUTH_REQUEST = 'capture-the-block/authentication/AUTH_REQUEST',
  AUTH_SUCCESS = 'capture-the-block/authentication/AUTH_SUCCESS',
  AUTH_FAILURE = 'capture-the-block/authentication/AUTH_FAILURE',
  SAVE_ACCESS_PERMIT = 'capture-the-block/authentication/SAVE_ACCESS_PERMIT',
  SAVE_ACCESS_TOKEN = 'capture-the-block/authentication/SAVE_ACCESS_TOKEN',
  CONNECT_WALLET_REQUEST = 'capture-the-block/authentication/CONNECT_WALLET_REQUEST',
  CONNECT_WALLET_SUCCESS = 'capture-the-block/authentication/CONNECT_WALLET_SUCCESS',
  CONNECT_WALLET_FAILURE = 'capture-the-block/authentication/CONNECT_WALLET_FAILURE',
  LOG_OUT = 'capture-the-block/authentication/LOG_OUT',
  SET_ETH_ADDRESS = 'capture-the-block/authentication/SET_ETH_ADDRESS',
  BROWSER_SIGNING_ERROR = 'capture-the-block/authentication/BROWSER_SIGNING_ERROR',
}

export default ActionTypes;
