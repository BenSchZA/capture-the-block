import { eventChannel } from 'redux-saga';
import { call, cancel, delay, fork, put, race, select, take, all } from 'redux-saga/effects';
import * as authenticationActions from './actions';
import { getMatch, priceToBuy, rewardForSell, getMatchSidePoolBalance, getBalanceOf, matchIndex, startMatchTx, buyTokenTx, sellTokenTx, claimWinningsTx } from './chainInteractions';
import { Match } from './types';
import { setMatchAction, claimWinningsAction } from './actions';
import { ethers } from 'ethers';

export function* fetchMatch(index: number){
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
  const matchData = yield call(getMatch, index);
  newMatch.targetSupply = parseFloat(`${ethers.utils.formatUnits(matchData[1], 18)}`);
  newMatch.gradient = parseFloat(`${ethers.utils.formatUnits(matchData[3], 18)}`);
  newMatch.prize = parseFloat(`${ethers.utils.formatUnits(matchData[2], 18)}`);
  newMatch.ended = matchData[4];
  newMatch.numberOfSides = matchData[0];
  newMatch.sides[0].buyPrice = yield call(priceToBuy, index, 0);
  newMatch.sides[1].buyPrice = yield call(priceToBuy, index, 1);

  newMatch.sides[0].sellPrice = yield call(rewardForSell, index, 0);
  newMatch.sides[1].sellPrice = yield call(rewardForSell, index, 1);

  newMatch.sides[0].poolBalance = yield call(getMatchSidePoolBalance, index, 0);
  newMatch.sides[1].poolBalance = yield call(getMatchSidePoolBalance, index, 1);

  newMatch.sides[0].balance = yield call(getBalanceOf, index, 0);
  newMatch.sides[1].balance = yield call(getBalanceOf, index, 1);

  yield put(setMatchAction(newMatch))
}

export function* fetchMatches(currentMatch: number){
  for(let i = currentMatch; i == 0;  i--){
    yield fork(fetchMatch, i);
  }
}



// Listeners
export function* fetchMatchListener() {
  while (true) {
    const index = (yield take(authenticationActions.fetchMatchAction)).payload;
    yield fork(fetchMatch, index);
  }
}

export function* fetchAllListener() {
  while (true) {
    yield take(authenticationActions.fetchAllAction);
    // Get current match
    const index = yield call(matchIndex);

    yield fork(fetchMatches, parseInt(`${ethers.utils.formatUnits(index, 0)}`))
    // fork Fetchmatchs with current

  }
}


export function* startMatchListener(){
  while(true){
    const {numberOfSides, targetSupply, gradient} = (yield take(authenticationActions.startMatchAction.request)).payload;
    try{
      const index = yield call(startMatchTx, numberOfSides, targetSupply, gradient);
      yield fork(fetchMatch, parseInt(ethers.utils.formatUnits(index, 0)));
      yield put(authenticationActions.startMatchAction.success())
    }
    catch(e){
      yield put(authenticationActions.startMatchAction.failure(e))
    }
  }
}

export function* buyTokenListener(){
  while(true){
    const side = (yield take(authenticationActions.buyTokenAction.request)).payload
    try{
      const index = yield call(buyTokenTx, side);
      yield fork(fetchMatch, parseInt(ethers.utils.formatUnits(index, 0)));
      yield put(authenticationActions.buyTokenAction.success())
    }
    catch(e){
      yield put(authenticationActions.buyTokenAction.failure(e))
    }
  }
}

export function* sellTokenListener(){
  while(true){
    const side = (yield take(authenticationActions.sellTokenAction.request)).payload
    try{
      const index = yield call(sellTokenTx, side);
      yield fork(fetchMatch, parseInt(ethers.utils.formatUnits(index, 0)));
      yield put(authenticationActions.sellTokenAction.success())
    }
    catch(e){
      yield put(authenticationActions.sellTokenAction.failure(e))
    }
  }
}

export function* ClaimWinningsListener(){
  while(true){
    const index = (yield take(authenticationActions.claimWinningsAction.request)).payload
    try{
      yield call(claimWinningsTx, index);

      yield fork(fetchMatch, index);
      yield put(authenticationActions.claimWinningsAction.success())
    }
    catch(e){
      yield put(authenticationActions.claimWinningsAction.failure(e))
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
  while (true) {
  }
}
