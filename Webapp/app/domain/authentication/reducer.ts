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
    case getType(authenticationActions.connectWallet.success):
      return {
        ...state,
        ...{ errorMessage: '' },
        ...{ walletUnlocked: true },
      };
    case getType(authenticationActions.connectWallet.failure):
      return {
        ...state,
        ...{ errorMessage: action.payload },
        ...{ walletUnlocked: false },
      };
    case getType(authenticationActions.logOut):
      return {
        ...initialState,
        ...{ walletUnlocked: state.walletUnlocked },
      };
    case getType(authenticationActions.setEthAddress):
      return {
        ...state,
        ...{ethAddress: action.payload.ethAddress }
      }
    default:
      return state;
  }
}

export default authenticationReducer;
