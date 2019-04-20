import { eventChannel } from 'redux-saga';
import { call, cancel, delay, fork, put, race, select, take, spawn } from 'redux-saga/effects';
import { ApplicationRootState } from 'types';
import { forwardTo } from 'utils/history';
import * as authenticationActions from './actions';
import {fetchAllAction} from '../captureTheBlock/actions';
import ActionTypes from './constants';
import { refreshBalancesAction, setTxContextAction } from 'domain/transactionManagement/actions';
import { getBlockchainObjects, signMessage } from 'blockchainResources';
import { balanceOfTx, getApproval, mintTx, approveTx } from './chainInteractions';

export function* checkDaiRequirements(){
  try {
    console.log(yield call(getApproval));
    const allowance = yield call(getApproval);
    if(allowance == 0){
      const balance = yield call(balanceOfTx);
      if(balance == 0){
        yield put(setTxContextAction(`Claiming Free tokens`));
        const mintedAmount = yield call(mintTx);
      }
      yield put(setTxContextAction(`Approving Transfers to Game`));
      const approvedForAmount = yield call(approveTx);
    }
  }
  catch(e){
    console.log(e);
  }
}

export function* connectWallet() {
  const {signerAddress, provider } = yield call(getBlockchainObjects);
  if (provider) {
    try {
      yield put(authenticationActions.setEthAddress({ethAddress : signerAddress}));
      yield spawn(checkDaiRequirements);
      yield put(fetchAllAction());
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
    ethereum.on('accountsChanged', (e: Array<string>) => {
      emit(e[0]);
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
      yield cancel(connectWalletTask);
      yield fork(addressChangeListener);
      yield take(ActionTypes.LOG_OUT);
      localStorage.clear();
    } else {
      yield delay(2000);
    }
  }
}
