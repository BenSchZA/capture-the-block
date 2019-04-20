import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import ActionTypes from './constants';
import { Match } from './types';


export const startMatchAction = createAsyncAction(
  ActionTypes.START_MATCH_TX_REQUEST,
  ActionTypes.START_MATCH_TX_SUCCESS,
  ActionTypes.START_MATCH_TX_FAILURE)
  <{numberOfSides: number, targetSupply: number, gradient: number}, void, string>();

export const buyTokenAction = createAsyncAction(
  ActionTypes.BUY_TX_REQUEST,
  ActionTypes.BUY_TX_SUCCESS,
  ActionTypes.BUY_TX_FAILURE)
  <number, void, string>();

export const sellTokenAction = createAsyncAction(
  ActionTypes.SELL_TX_REQUEST,
  ActionTypes.SELL_TX_SUCCESS,
  ActionTypes.SELL_TX_FAILURE)
  <number, void, string>();

export const claimWinningsAction = createAsyncAction(
  ActionTypes.CLAIM_TX_REQUEST,
  ActionTypes.CLAIM_TX_SUCCESS,
  ActionTypes.CLAIM_TX_FAILURE)
  <number, void, string>();

export const priceToBuyAction = createStandardAction(ActionTypes.PRICE_TO_BUY)<{index :number, side: number, price: number}>();
export const priceToSellAction = createStandardAction(ActionTypes.PRICE_TO_SELL)<{index :number, side: number, price: number}>();
export const getMatchAction = createStandardAction(ActionTypes.GET_MATCH)();
export const getMatchPoolBalanceAction = createStandardAction(ActionTypes.GET_MATCH_POOL_BALANCE)();
export const getBalanceAction = createStandardAction(ActionTypes.GET_BALANCE)();
export const matchIndexAction = createStandardAction(ActionTypes.MATCH_INDEX)();
export const collateralAddressAction = createStandardAction(ActionTypes.COLLATERAL_ADDRESS)();

export const fetchAllAction = createStandardAction(ActionTypes.FETCH_ALL)();
export const fetchMatchAction = createStandardAction(ActionTypes.FETCH_MATCH)<number>();
export const setMatchAction = createStandardAction(ActionTypes.SET_MATCH)<Match>();
