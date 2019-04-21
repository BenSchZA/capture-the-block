import { abi as CaptureTheBlockAbi} from "../../../../Blockchain/build/CaptureTheBlockV1.json";

import { ethers } from "ethers";


// Ethers standard event filter type is missing the blocktags
import { BlockTag } from 'ethers/providers/abstract-provider';
import { blockchainResources, getBlockchainObjects } from "blockchainResources";

export declare type EventFilter = {
	address?: string;
	topics?: Array<string>;
	fromBlock?: BlockTag;
	toBlock?: BlockTag
};

export async function buyTokenTx(side: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const txReceipt = await(await captureTheBlockContract.purchaseToken(side)).wait();

		const tokenPuchasedEvent = captureTheBlockContract.interface.parseLog(await(txReceipt.events.filter(
      event => event.eventSignature == captureTheBlockContract.interface.events.TokenPuchased.signature
		))[0]);
		
		// Could check here for the end of the match
		return tokenPuchasedEvent ? tokenPuchasedEvent.values.index : false;
	}
	catch(e){
		throw e;
	}
}

export async function sellTokenTx(side: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const txReceipt = await(await captureTheBlockContract.sellToken(side)).wait();

		const tokenSoldEvent = captureTheBlockContract.interface.parseLog(await(txReceipt.events.filter(
      event => event.eventSignature == captureTheBlockContract.interface.events.TokenSold.signature
		))[0]);
		
		return tokenSoldEvent ? tokenSoldEvent.values.index : false;
	}
	catch(e){
		throw e;
	}
}
    
export async function startMatchTx(numberOfSides: number, targetSupply: number, gradient: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    	const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const txReceipt = await(await captureTheBlockContract.startMatch(ethers.utils.bigNumberify(numberOfSides), ethers.utils.bigNumberify(targetSupply), ethers.utils.bigNumberify(gradient))).wait();

		const matchStartedEvent = captureTheBlockContract.interface.parseLog(await(txReceipt.events.filter(
      event => event.eventSignature == captureTheBlockContract.interface.events.MatchStarted.signature
		))[0]);
		
		return matchStartedEvent ? matchStartedEvent.values.index : false;
	}
	catch(e){
		throw e;
	}
}

export async function claimWinningsTx(index: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const txReceipt = await(await captureTheBlockContract.claimWinnings(index)).wait();

		const claimWinningsEvent = captureTheBlockContract.interface.parseLog(await(txReceipt.events.filter(
      event => event.eventSignature == captureTheBlockContract.interface.events.WinningsClaimed.signature
		))[0]);
		
		return claimWinningsEvent ? claimWinningsEvent.values.index : false;
	}
	catch(e){
		throw e;
	}
}

export async function priceToBuy(index: number, side: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const daiPriceBN = await captureTheBlockContract.priceToBuy(index, side);

		return parseFloat(ethers.utils.formatUnits(daiPriceBN, 18));
	}
	catch(e){
		console.error(e)
		return 0;
	}
}

export async function rewardForSell(index: number, side: number){
	try {
		const {provider, signer} = await getBlockchainObjects();
    	const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const daiPriceBN = await captureTheBlockContract.rewardForSell(index, side);

		return parseFloat(ethers.utils.formatUnits(daiPriceBN, 18));
	}
	catch(e){
		console.error(e)
		return 0
	}
}

export async function getMatch(index: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const matchData = await captureTheBlockContract.getMatch(index);

		return matchData;
	}
	catch(e){
		throw e;
	}
}

export async function getTotalSupply(index: number, side: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    	const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const totalSupply = await captureTheBlockContract.getSideTotalSupply(index, side);

		return parseFloat(ethers.utils.formatUnits(totalSupply, 0));
	}
	catch(e){
		console.error(e);
		return 0;
	}
}

export async function getMatchSidePoolBalance(index: number, side: number){
	try{
		const {provider, signer} = await getBlockchainObjects();
    const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const daiPriceBN = await captureTheBlockContract.getMatchSidePoolBalance(index, side);

		return parseFloat(ethers.utils.formatUnits(daiPriceBN, 18));
	}
	catch(e){
		console.error(e);
		return 0;
	}
}

export async function getBalanceOf(index: number, side: number){
	try{
		const {provider, signer, signerAddress} = await getBlockchainObjects();
		const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const tokensBN = await captureTheBlockContract.getBalanceOf(index, side, signerAddress);

		return parseInt(ethers.utils.formatUnits(tokensBN, 0));
	}
	catch(e){
		console.error(e);
		return 0;
	}
}

export async function matchIndex(){
	try{
		const {provider, signer} = await getBlockchainObjects();
		const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const matchIndexBN = await captureTheBlockContract.matchIndex();
		return parseInt(ethers.utils.formatUnits(matchIndexBN, 0));
	}
	catch(e){
		console.error(e);
		return 0;
	}
}

export async function collateralAddress(){
	try{
		const {provider, signer} = await getBlockchainObjects();
		const captureTheBlockContract = (await new ethers.Contract(`${blockchainResources.captureTheBlockContractAddress}`, JSON.stringify(CaptureTheBlockAbi), provider)).connect(signer);
		const collateralAddress = await captureTheBlockContract.collateralAddress();

		return collateralAddress;
	}
	catch(e){
		throw e;
	}
}