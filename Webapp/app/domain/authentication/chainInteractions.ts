import { abi as DaiContractAbi} from "../../../../Blockchain/build/PseudoDaiToken.json";

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

export async function mintTx(){
	try{
		const {provider, signer, signerAddress} = await getBlockchainObjects();
    const daiContract = (await new ethers.Contract(`${blockchainResources.daiAddress}`, JSON.stringify(DaiContractAbi), provider)).connect(signer);

		const txReceipt = await(await daiContract.mint()).wait();

		const mintEvent = daiContract.interface.parseLog(await(txReceipt.events.filter(
      event => event.eventSignature == daiContract.interface.events.Transfer.signature
		))[0]);
		
		return mintEvent ? parseFloat(ethers.utils.formatUnits(mintEvent.values.value, 18)) : 0;
	}
	catch(e){
		throw e;
	}
}

export async function approveTx(){
	try{
		const {provider, signer, signerAddress} = await getBlockchainObjects();
    const daiContract = (await new ethers.Contract(`${blockchainResources.daiAddress}`, JSON.stringify(DaiContractAbi), provider)).connect(signer);

		const txReceipt = await(await daiContract.approve(blockchainResources.captureTheBlockContractAddress, ethers.constants.MaxUint256)).wait();

		const approvalEvent = daiContract.interface.parseLog(await(txReceipt.events.filter(
      event => event.eventSignature == daiContract.interface.events.Approval.signature
		))[0]);
		
		return approvalEvent ? parseFloat(ethers.utils.formatUnits(approvalEvent.values.value, 18)) : 0;
	}
	catch(e){
		throw e;
	}
}

export async function balanceOfTx(){
	try{
		const {provider, signer, signerAddress} = await getBlockchainObjects();
    const daiContract = (await new ethers.Contract(`${blockchainResources.daiAddress}`, JSON.stringify(DaiContractAbi), provider)).connect(signer);

		const balanceBN = await daiContract.balanceOf(signerAddress);

		return parseFloat(ethers.utils.formatUnits(balanceBN, 18));
	}
	catch(e){
		throw e;
	}
}

export async function getApproval(){
	try{
		const {provider, signer, signerAddress} = await getBlockchainObjects();
		const daiContract = (await new ethers.Contract(`${blockchainResources.daiAddress}`, JSON.stringify(DaiContractAbi), provider)).connect(signer);
		const approvalBn = await daiContract.allowance(signerAddress, blockchainResources.captureTheBlockContractAddress);;
		return approvalBn.gt(0);
	}
	catch(e){
		debugger;
		console.log(e);
		throw e;
	}
}