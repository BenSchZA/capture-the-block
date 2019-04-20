import { Reducer, Store } from 'redux';
import { ContainerState as GlobalState } from '../containers/App/types';
import { DomainState as AuthenticationState } from '../domain/authentication/types';
import { DomainState as TransactionManagementState} from '../domain/transactionManagement/types';
import { ContainerState as DashboardState } from '../containers/DashboardContainer/types';

export interface LifeStore extends Store<{}> {
  injectedReducers?: any;
  injectedSagas?: any;
  runSaga(saga: () => IterableIterator<any>, args: any): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly global: GlobalState;
  // Domains
  readonly authentication: AuthenticationState;
  readonly transactionManagement: TransactionManagementState

  // Pages
  readonly dashboard: DashboardState;
}