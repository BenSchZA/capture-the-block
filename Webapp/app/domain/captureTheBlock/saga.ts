import { eventChannel } from 'redux-saga';
import { call, cancel, delay, fork, put, race, select, take, all } from 'redux-saga/effects';
import * as authenticationActions from './actions';
import { getMatch, priceToBuy, rewardForSell, getMatchSidePoolBalance, getBalanceOf, matchIndex } from './chainInteractions';
import { Match } from './types';
import { setMatchAction } from './actions';
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
    const index = yield take(authenticationActions.fetchMatchAction);

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

  }
}

export function* buyTokenListener(){
  while(true){
    
  }
}

export function* sellTokenListener(){
  while(true){
    
  }
}

export function* ClaimWinningsListener(){
  while(true){
    
  }
}

export default function* rootCaptureTheBlockSaga() {
  yield fork(fetchAllListener);
  while (true) {
  }
}
