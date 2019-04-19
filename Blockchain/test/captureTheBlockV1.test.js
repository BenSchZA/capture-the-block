const etherlime = require('etherlime');
const ethers = require('ethers');

var PseudoDaiToken = require('../build/PseudoDaiToken.json');
var CaptureTheBlock = require('../build/CaptureTheBlockV1.json');

const daiSettings = {
    name: "PDAI",
    symbol: "PDAI",
    decimals: 18
}

describe('Capture The Block V1', () => {
    let deployer;
    let adminAccount = devnetAccounts[1];
    let player1 = devnetAccounts[2];
    let player2 = devnetAccounts[3];
    let player3 = devnetAccounts[4];
    let player4 = devnetAccounts[5];
    let player5 = devnetAccounts[6];
    let player6 = devnetAccounts[7];

    let pseudoDaiInstance, captureTheBlockInstance;

    beforeEach('', async () => {
        deployer = new etherlime.EtherlimeDevnetDeployer(devnetAccounts[0].secretKey);

        pseudoDaiInstance = await deployer.deploy(
            PseudoDaiToken, 
            false, 
            daiSettings.name, 
            daiSettings.symbol, 
            daiSettings.decimals
        );

        captureTheBlockInstance = await deployer.deploy(
            CaptureTheBlock, 
            false, 
            pseudoDaiInstance.contractAddress
        );

        // Get test Dai
        await pseudoDaiInstance.from(adminAccount.wallet.address).mint();
        await pseudoDaiInstance.from(player1.wallet.address).mint();
        await pseudoDaiInstance.from(player2.wallet.address).mint();
        await pseudoDaiInstance.from(player3.wallet.address).mint();
        await pseudoDaiInstance.from(player4.wallet.address).mint();
        await pseudoDaiInstance.from(player5.wallet.address).mint();
        await pseudoDaiInstance.from(player6.wallet.address).mint();

        // Unlock approval
        await pseudoDaiInstance.from(adminAccount.wallet.address)
            .approve(
                captureTheBlockInstance.contract.address,
                ethers.constants.MaxUint256
            );

        await pseudoDaiInstance.from(player1.wallet.address)
            .approve(
                captureTheBlockInstance.contract.address,
                ethers.constants.MaxUint256
            );

        await pseudoDaiInstance.from(player2.wallet.address)
            .approve(
                captureTheBlockInstance.contract.address,
                ethers.constants.MaxUint256
            );
            
        await pseudoDaiInstance.from(player3.wallet.address)
            .approve(
                captureTheBlockInstance.contract.address,
                ethers.constants.MaxUint256
            );

        await pseudoDaiInstance.from(player4.wallet.address)
            .approve(
                captureTheBlockInstance.contract.address,
                ethers.constants.MaxUint256
            );
        
        await pseudoDaiInstance.from(player5.wallet.address)
            .approve(
                captureTheBlockInstance.contract.address,
                ethers.constants.MaxUint256
            );

        await pseudoDaiInstance.from(player6.wallet.address)
            .approve(
                captureTheBlockInstance.contract.address,
                ethers.constants.MaxUint256
            );

    })

    describe('Game testing', () => {
        it('Creates a match')
        it('Purchases a token for side 1')
    })

    describe('Meta Checks', () => {

    })
})