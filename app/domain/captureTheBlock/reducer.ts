// import { ContainerState, ContainerActions } from './types';
import { getType } from 'typesafe-actions';
import * as captureTheBlockActions from './actions';
import { DomainActions, DomainState, Side } from './types';

export const initialState: DomainState = {
  currentIndex: 0,
  match: {
    index: 0,
    numberOfSides: 0,
    sides: [],
    winner: 0,
    targetSupply: 0,
    prize: 0,
    gradient: 0,
    ended: true,
  }
};

function captureTheBlockReducer(state: DomainState = initialState, action: DomainActions) {
  switch (action.type) {
    case getType(captureTheBlockActions.startMatchAction.success):
      return {
        ...state,
      };
    case getType(captureTheBlockActions.buyTokenAction.success):
      return {
        ...state,
      };
    case getType(captureTheBlockActions.sellTokenAction.success):
      return {
        ...state,
      };
    case getType(captureTheBlockActions.claimWinningsAction.success):
      return {
        ...state,
      };
    case getType(captureTheBlockActions.getMatchAction):
      return {
        ...state,
      }
    case getType(captureTheBlockActions.getMatchPoolBalanceAction):
      return {
        ...state,
      }
    case getType(captureTheBlockActions.getBalanceAction):
      return {
        ...state,
      }
    case getType(captureTheBlockActions.matchIndexAction):
      return {
        ...state,
      }
    case getType(captureTheBlockActions.collateralAddressAction):
      return {
        ...state,
      }
    case getType(captureTheBlockActions.setMatchAction):
      return {
        ...state,
        match: {
          ...action.payload
        }
      }
    default:
      return state;
  }
}

export default captureTheBlockReducer;
