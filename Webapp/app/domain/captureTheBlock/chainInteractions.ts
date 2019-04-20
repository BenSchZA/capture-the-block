import { abi as DaiContractAbi} from "../../../../Blockchain/build/PseudoDaiToken.json";
import { abi as CaptureTheBlockAbi} from "../../../../Blockchain/build/CaptureTheBlockV1.json";

import { ethers } from "ethers";


// Ethers standard event filter type is missing the blocktags
import { BlockTag } from 'ethers/providers/abstract-provider';
import { blockchainResources, getBlockchainObjects } from "blockchainResources";
import { BigNumber } from "ethers/utils";


export declare type EventFilter = {
    address?: string;
    topics?: Array<string>;
    fromBlock?: BlockTag;
    toBlock?: BlockTag
  };

export async function buyTokenTx(side: number){

}

export async function sellTokenTx(side: number){

}
    
export async function startMatchTx(numberOfSides: number, targetSupply: number, gradient: number){

}

export async function claimWinningsTx(index: number){
    
}

export async function priceToBuy(index: number, side: number){

}

export async function rewardForSell(index: number, side: number){
    
}

export async function getMatch(index: number){
    
}

export async function getMatchSidePoolBalance(index: number, side: number){
    
}

export async function getBalanceOf(index: number, side: number){
    // Address
    
}

export async function matchIndex(){
    
}

export async function collateralAddress(){
    
}