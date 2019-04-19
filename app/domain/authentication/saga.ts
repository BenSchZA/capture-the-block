import { eventChannel } from 'redux-saga';
import { call, cancel, delay, fork, put, race, select, take } from 'redux-saga/effects';
import { ApplicationRootState } from 'types';
import { forwardTo } from 'utils/history';
import * as authenticationActions from './actions';
import ActionTypes from './constants';
import { refreshBalancesAction } from 'domain/transactionManagement/actions';
import { getBlockchainObjects, signMessage } from 'blockchainResources';

export function* loginFlow() {
  while (yield take(ActionTypes.AUTH_REQUEST)) {
    try {
      const {signerAddress} = yield call(getBlockchainObjects);
      yield put(refreshBalancesAction());
      yield call(forwardTo, '/dashboard'); // TODO: have this only redirect when on log in
    } catch (error) {
      console.log(error);
    }
  }
}

export function* connectWallet() {
  const {ethAddress, provider } = yield call(getBlockchainObjects);
  if (provider) {
    try {
      yield put(authenticationActions.setEthAddress({ethAddress : ethAddress}));
      yield put(authenticationActions.connectWallet.success());
    } catch (error) {
      yield put(authenticationActions.connectWallet.failure(error.message));
    }
  } else {
    yield put(authenticationActions.connectWallet.failure('Non-Ethereum browser detected. You should consider trying MetaMask!'));
  }
}

// Exported for testing purposes
export const addressChangeEventChannel = eventChannel(emit => {
  try{
    const { ethereum } = window as any;
    ethereum.on('accountsChanged', () => {
      emit('Wallet Address changed');
    });
  }
  catch(e){
    emit("Error")
  }
  return () => { };
});

export function* addressChangeListener() {
  while (true) {
    const newAddress = yield take(addressChangeEventChannel);
    yield put(authenticationActions.setEthAddress({ethAddress : newAddress}));
    yield put(authenticationActions.logOut());
    yield fork(connectWallet)
  }
}

export default function* rootAuthenticationSaga() {
  while (true) {
    // Start a task to unlock the wallet.
    const connectWalletTask = yield fork(connectWallet);

    // Wait till a response comes back a response on the wallet.
    const { success } = yield race({
      cancel: take(ActionTypes.CONNECT_WALLET_FAILURE),
      success: take(ActionTypes.CONNECT_WALLET_SUCCESS),
    });

    if (success) {
      // Cancel the task that we started
      yield cancel(connectWalletTask);

      // Start the addressChange listener
      yield fork(addressChangeListener);

      // Check store for existing signed message

      // Wait till we receive a logout event
      yield take(ActionTypes.LOG_OUT);
      localStorage.clear();
    } else {
      yield delay(2000);
    }
  }
}
