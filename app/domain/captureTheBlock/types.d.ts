import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

export interface Side {
  buyPrice: number;
  sellPrice: number;
  balance: number;
  poolBalance: number;
  totalSupply: number;
}

export interface Match {
  index: number;
  numberOfSides: number;
  sides: Side[];
  winner: number;
  targetSupply: number;
  prize: number;
  gradient: number;
  ended: boolean;
}

/* --- STATE --- */
interface CaptureTheBlockState {
  currentIndex: number;
  match: Match;
}


/* --- ACTIONS --- */
type AuthenticationActions = ActionType<typeof actions>;


/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = CaptureTheBlockState;
type DomainActions = AuthenticationActions;

export { RootState, DomainState, DomainActions };
