import { Reducer, Store } from 'redux';
import { ContainerState as GlobalState } from '../containers/App/types';
import { DomainState as AuthenticationState } from '../domain/authentication/types';
import { DomainState as TransactionManagementState } from '../domain/transactionManagement/types';
import { DomainState as CaptureTheBlockState } from '../domain/captureTheBlock/types';

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

export interface ApplicationRootState {
  readonly global: {},
  readonly authentication: AuthenticationState;
  readonly transactionManagement: TransactionManagementState;
  readonly captureTheBlock: CaptureTheBlockState;
}
