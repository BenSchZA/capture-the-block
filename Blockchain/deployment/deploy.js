require('dotenv').config();
// yarn debug deploy --network=devnet --runs=999
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
// const DEPLOYER_MNEMONIC = process.env.DEPLOYER_MNEMONIC;
const DAI_ADDRESS = process.env.DAI_ADDRESS;

const etherlime = require('etherlime');
const ethers = require('ethers');

var PseudoDaiToken = require('../build/PseudoDaiToken.json');
const CaptureTheBlockV1 = require('../build/CaptureTheBlockV1.json');

const daiSettings = {
    name: "PDAI",
    symbol: "PDAI",
    decimals: 18
}

const defaultConfigs = {
    gasPrice: 20000000000,
    gasLimit: 4700000
}

const deploy = async (network, secret) => {
	if(!secret){
		secret = DEPLOYER_PRIVATE_KEY;
	}
	let deployer, daiAddress;
	
	switch(network){
		case "devnet": {
			deployer = new etherlime.EtherlimeDevnetDeployer(secret, 8545, defaultConfigs)
			let pseudoDaiInstance = await deployer.deploy(
				PseudoDaiToken, 
				false, 
				daiSettings.name, 
				daiSettings.symbol, 
				daiSettings.decimals
			);
			let captureTheBlockInstance = await deployer.deploy(
				CaptureTheBlockV1, 
				false,
				pseudoDaiInstance.contract.address);
		}
		case "rinkeby":{
			deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, INFURA_API_KEY, defaultConfigs);
			let pseudoDaiInstance = await deployer.deploy(
				PseudoDaiToken, 
				false, 
				daiSettings.name, 
				daiSettings.symbol, 
				daiSettings.decimals
			);
			let captureTheBlockInstance = await deployer.deploy(
				CaptureTheBlockV1, 
				false,
				pseudoDaiInstance.contract.address);
			break;
		}
		default: {
			// TODO: mainnet deployment script using actual DAI address
			break;
		}
	}
};

module.exports = {
	deploy
};