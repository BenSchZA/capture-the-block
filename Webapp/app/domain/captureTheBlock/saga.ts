
import { call, fork, put, take, delay } from 'redux-saga/effects';
import * as captureTheBlockActions from './actions';
import { 
  getMatch, 
  priceToBuy, 
  rewardForSell, 
  getMatchSidePoolBalance, 
  getBalanceOf, 
  matchIndex, 
  startMatchTx, 
  buyTokenTx, 
  sellTokenTx, 
  claimWinningsTx, 
  getTotalSupply
} from './chainInteractions';
import { Match } from './types';
import { setMatchAction, claimWinningsAction } from './actions';
import { ethers } from 'ethers';
import { setTxContextAction, setRemainingTxCountAction } from 'domain/transactionManagement/actions';

export function* fetchMatch(index: number){
  debugger;
  if (index === 0) {return;};
  let newMatch: Match = {
    ended: false,
    numberOfSides: 2,
    gradient: 3,
    index: index,
    prize: 0,
    sides: [],
    targetSupply: 0,
    winner: 0
  };
  yield delay(5000);
  debugger;
  const matchData = yield call(getMatch, index);
  debugger;
  newMatch.targetSupply = parseFloat(`${ethers.utils.formatUnits(matchData[1], 18)}`);
  debugger;
  newMatch.gradient = parseFloat(`${ethers.utils.formatUnits(matchData[3], 18)}`);
  debugger;
  newMatch.prize = parseFloat(`${ethers.utils.formatUnits(matchData[2], 18)}`);
  debugger;
  newMatch.ended = matchData[4];
  debugger;
  newMatch.numberOfSides = matchData[0];

  newMatch.sides = [{
    buyPrice: yield call(priceToBuy, index, 0),
    sellPrice: yield call(rewardForSell, index, 0),
    poolBalance: yield call(getMatchSidePoolBalance, index, 0),
    balance: yield call(getBalanceOf, index, 0),
    totalSupply: yield call(getTotalSupply, index, 0),
  }, {
    buyPrice: yield call(priceToBuy, index, 1),
    sellPrice: yield call(rewardForSell, index, 1),
    poolBalance: yield call(getMatchSidePoolBalance, index, 1),
    balance: yield call(getBalanceOf, index, 1),
    totalSupply: yield call(getTotalSupply, index, 1),
  }]
  debugger;

  yield put(setMatchAction(newMatch))
}

export function* fetchMatches(currentMatch: number){
  debugger;
  for(let i = currentMatch; i > 0;  i--){
    debugger;
    if(i != 0){
      yield fork(fetchMatch, i);
    }
  }
}

// Listeners
export function* fetchMatchListener() {
  while (true) {
    const index = (yield take(captureTheBlockActions.fetchMatchAction)).payload;

    yield fork(fetchMatch, index);
  }
}

export function* fetchAllListener() {
  while (true) {
    yield take(captureTheBlockActions.fetchAllAction);
    debugger;
    const index = yield call(matchIndex);
    yield fork(fetchMatches, parseInt(`${ethers.utils.formatUnits(index, 0)}`))
  }
}


export function* startMatchListener(){
  while(true){
    const {numberOfSides, targetSupply, gradient} = (yield take(captureTheBlockActions.startMatchAction.request)).payload;
    debugger;
    try{
      debugger;
      yield put(setTxContextAction(`Starting match`));
      yield put(setRemainingTxCountAction(1));
      const index = yield call(startMatchTx, numberOfSides, targetSupply, gradient);
      debugger;
      yield put(setRemainingTxCountAction(0));
      const temp = parseInt(ethers.utils.formatUnits(index, 0))
      yield fork(fetchMatch, temp);
      debugger;
      yield put(captureTheBlockActions.startMatchAction.success())
    }
    catch(e){
      yield put(captureTheBlockActions.startMatchAction.failure(e))
    }
  }
}

export function* buyTokenListener(){
  while(true){
    const side = (yield take(captureTheBlockActions.buyTokenAction.request)).payload
    try{
      yield put(setTxContextAction(`Buying token`));
      yield put(setRemainingTxCountAction(1));
      const index = yield call(buyTokenTx, side);
      yield put(setRemainingTxCountAction(0));
      yield fork(fetchMatch, parseInt(ethers.utils.formatUnits(index, 0)));
      yield put(captureTheBlockActions.buyTokenAction.success())
    }
    catch(e){
      yield put(captureTheBlockActions.buyTokenAction.failure(e))
    }
  }
}

export function* sellTokenListener(){
  while(true){
    const side = (yield take(captureTheBlockActions.sellTokenAction.request)).payload
    try{
      yield put(setTxContextAction(`Selling token`));
      yield put(setRemainingTxCountAction(1));
      const index = yield call(sellTokenTx, side);
      yield put(setRemainingTxCountAction(0));
      yield fork(fetchMatch, parseInt(ethers.utils.formatUnits(index, 0)));
      yield put(captureTheBlockActions.sellTokenAction.success())
    }
    catch(e){
      yield put(captureTheBlockActions.sellTokenAction.failure(e))
    }
  }
}

export function* ClaimWinningsListener(){
  while(true){
    const index = (yield take(captureTheBlockActions.claimWinningsAction.request)).payload
    try{
      yield put(setTxContextAction(`Claiming winnings`));
      yield put(setRemainingTxCountAction(1));
      yield call(claimWinningsTx, index);
      yield put(setRemainingTxCountAction(0));

      yield fork(fetchMatch, index);
      yield put(captureTheBlockActions.claimWinningsAction.success())
    }
    catch(e){
      yield put(captureTheBlockActions.claimWinningsAction.failure(e))
    }
  }
}

export default function* rootCaptureTheBlockSaga() {
  yield fork(fetchAllListener);
  yield fork(fetchMatchListener);
  yield fork(startMatchListener);
  yield fork(buyTokenListener);
  yield fork(sellTokenListener);
  yield fork(ClaimWinningsListener);
}
