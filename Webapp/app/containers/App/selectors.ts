import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { makeSelectTxPending, makeSelectTxRemaining, makeSelectTxContext } from 'domain/transactionManagement/selectors';
import { blockchainResources } from 'blockchainResources';

/**
 * Other specific selectors
 */
const selectEthAddress = (state: ApplicationRootState) => state.authentication.ethAddress ? state.authentication.ethAddress : "0x";

const selectNetworkState = () => blockchainResources.approvedNetwork;

const selectNetworkId = () => blockchainResources.networkId;

/**
 * Default selector used by App
 */
const makeSelectEthAddress = createSelector(selectEthAddress, substate => {
  return substate;
})

const makeSelectNetworkState = createSelector(selectNetworkState, substate => {
  return substate;
})


const makeSelectNetworkId = createSelector(selectNetworkId, substate => {
  return substate;
})

// Root
const selectApp = createSelector(
  makeSelectEthAddress, makeSelectTxPending, makeSelectTxRemaining, makeSelectTxContext, makeSelectNetworkState, makeSelectNetworkId,
  (ethAddress, txPending, txRemaining, txContext, networkReady, networkId) => ({
    ethAddress: ethAddress,
    txPending: txPending,
    txRemaining: txRemaining,
    txContext: txContext,
    networkReady: networkReady,
    networkId: networkId
  }
))

export { makeSelectEthAddress };
export default selectApp;
