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
    let adminAccount = devnetsAccounts[1];
    let player1 = devnetsAccounts[2];
    let player2 = devnetsAccounts[3];
    let player3 = devnetsAccounts[4];
    let player4 = devnetsAccounts[5];
    let player5 = devnetsAccounts[6];
    let player6 = devnetsAccounts[7];

    let pseudoDaiInstance, captureTheBlockInstance;

    beforeEach('', async () => {
        deployer = new etherlime.EtherlimeDevnetDeployer(devnetsAccounts[0].secretKey);

        pseudoDaiInstance = await deployer.deploy(
            PseudoDaiToken, 
            false, 
            daiSettings.name, 
            daiSettings.symbol, 
            daiSettings.decimals
        );

        captureTheBlockInstance = await deployer.deploy(
            PseudoDaiToken, 
            false, 
            daiSettings.name, 
            daiSettings.symbol, 
            daiSettings.decimals
        );
    })
})