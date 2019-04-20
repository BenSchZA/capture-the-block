// import { ContainerState, ContainerActions } from './types';
import { getType } from 'typesafe-actions';
import * as authenticationActions from './actions';
import { DomainActions, DomainState } from './types';

export const initialState: DomainState = {
  walletUnlocked: false,
  errorMessage: '',
  ethAddress: '',
};

function authenticationReducer(state: DomainState = initialState, action: DomainActions) {
  switch (action.type) {
    case getType(authenticationActions.startMatchAction.success):
      return {
        ...state,
      };
    case getType(authenticationActions.buyTokenAction.success):
      return {
        ...state,
      };
    case getType(authenticationActions.sellTokenAction.success):
      return {
        ...state,
      };
    case getType(authenticationActions.claimWinnings.success):
      return {
        ...state,
      };
    case getType(authenticationActions.priceToBuyAction):
      return {
        ...state,
      };
    case getType(authenticationActions.priceToSellAction):
      return {
        ...state,
      }
    case getType(authenticationActions.getMatchAction):
      return {
        ...state,
      }
    case getType(authenticationActions.getMatchPoolBalanceAction):
      return {
        ...state,
      }
    case getType(authenticationActions.getBalanceAction):
      return {
        ...state,
      }
    case getType(authenticationActions.matchIndexAction):
      return {
        ...state,
      }
    case getType(authenticationActions.collateralAddressAction):
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default authenticationReducer;
