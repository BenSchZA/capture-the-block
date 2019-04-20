const etherlime = require('etherlime');
const ethers = require('ethers');

var PseudoDaiToken = require('../build/PseudoDaiToken.json');
var CaptureTheBlock = require('../build/CaptureTheBlockV1.json');

const daiSettings = {
    name: "PDAI",
    symbol: "PDAI",
    decimals: 18
}

const matchSetting = [
    {
        numberOfSides: 2,
        targetSupply: 15,
        gradient: 3,
    }
]

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

        // // Unlock approval
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
        it('Creates a match', async () => {
            let currentMatchIndex = await captureTheBlockInstance.from(player1).matchIndex();
            assert.isOk(currentMatchIndex.eq(0), "Match incorrect");

            let matchData = await captureTheBlockInstance.from(player1).getMatch(currentMatchIndex);
            assert.isOk(matchData[4], "Initial match slot not set up correctly");

            await(await await captureTheBlockInstance.from(player1).createMatch(matchSetting[0].numberOfSides, matchSetting[0].targetSupply, matchSetting[0].gradient)).wait()

            currentMatchIndex = await captureTheBlockInstance.from(player1).matchIndex();
            assert.isOk(currentMatchIndex.eq(1), "Match incorrect");

            matchData = await captureTheBlockInstance.from(player1).getMatch(currentMatchIndex);
            assert.equal(matchData[0], matchSetting[0].numberOfSides, "First match sides not set up correctly");
            assert.isOk(matchData[1].eq(matchSetting[0].targetSupply), "First match targetSupply not set up correctly");
            assert.isOk(matchData[3].eq(matchSetting[0].gradient), "First match gradient not set up correctly");

        })

        describe("Playing a match", () => {
            beforeEach('Create a match', async () => {
                let currentMatchIndex = await captureTheBlockInstance.from(player1).matchIndex();
                assert.isOk(currentMatchIndex.eq(0), "Match incorrect");
    
                let matchData = await captureTheBlockInstance.from(player1).getMatch(currentMatchIndex);
                assert.isOk(matchData[4], "Initial match slot not set up correctly");
    
                await(await await captureTheBlockInstance.from(player1).createMatch(matchSetting[0].numberOfSides, matchSetting[0].targetSupply, matchSetting[0].gradient)).wait()
    
                currentMatchIndex = await captureTheBlockInstance.from(player1).matchIndex();
                assert.isOk(currentMatchIndex.eq(1), "Match incorrect");
    
                matchData = await captureTheBlockInstance.from(player1).getMatch(currentMatchIndex);
                assert.equal(matchData[0], matchSetting[0].numberOfSides, "First match sides not set up correctly");
                assert.isOk(matchData[1].eq(matchSetting[0].targetSupply), "First match targetSupply not set up correctly");
                assert.isOk(matchData[3].eq(matchSetting[0].gradient), "First match gradient not set up correctly");
    
            })
            it('Prices the first token on gradient 3 at 1.5Dai', async () => {
                let priceToBuySideA = await captureTheBlockInstance.from(player1).priceToBuy(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToBuySideA, 18), "1.5", "Price Incorrect")
            })
            it('Purchases the first token successfully', async () => {
                let balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "1000.0", "Balance not initalized correctly")

                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))
                balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "998.5", "Balance not initalized correctly")

                matchData = await captureTheBlockInstance.from(player1).getMatch(1);
                assert.equal(ethers.utils.formatUnits(matchData[2], 18), "1.5", "Prize not updated correctly")

                const tokenBalanceOnSide = await captureTheBlockInstance.from(player1).getBalanceOf(1,0,player1.wallet.address);

                assert.isOk(tokenBalanceOnSide.eq(1), "Token Balance incorrect")

                const getSidesPoolBalance = await captureTheBlockInstance.from(player1).getMatchSidePoolBalance(1,0);
                assert.equal(ethers.utils.formatUnits(getSidesPoolBalance, 18), "1.5", "Prize not updated correctly")
            })
            it('Prices the second token correctly', async () => {
                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))
                let priceToBuySideA = await captureTheBlockInstance.from(player1).priceToBuy(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToBuySideA, 18), "4.5", "Price Incorrect")
            })
            it('Purchases the second token successfully', async () => {
                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))
                let priceToBuySideA = await captureTheBlockInstance.from(player1).priceToBuy(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToBuySideA, 18), "4.5", "Price Incorrect")
            })
            it('Plays a match 4 players beat 2 opposing', async () =>{
                // Side A starts
                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))

                // Side B takes the lead
                await(await captureTheBlockInstance.from(player4).purchaseToken(1, 1))
                await(await captureTheBlockInstance.from(player5).purchaseToken(1, 1))

                // A swarm hits side A
                await(await captureTheBlockInstance.from(player2).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player3).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player6).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player3).purchaseToken(1, 0))

                // Side B tries to catch up
                await(await captureTheBlockInstance.from(player4).purchaseToken(1, 1))
                await(await captureTheBlockInstance.from(player5).purchaseToken(1, 1))
 
                // Player 1 panics 
                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))

                // Player 2 is super keen
                await(await captureTheBlockInstance.from(player2).purchaseToken(1, 0))

                // Player 6 Wants to hammer it 
                await(await captureTheBlockInstance.from(player6).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player6).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player6).purchaseToken(1, 0))
                await(await captureTheBlockInstance.from(player6).purchaseToken(1, 0))

                // Player 2 is so close
                await(await captureTheBlockInstance.from(player2).purchaseToken(1, 0))


                // Side B is putting up a fight
                await(await captureTheBlockInstance.from(player4).purchaseToken(1, 1))
                await(await captureTheBlockInstance.from(player5).purchaseToken(1, 1))
 
                  
                // Player 1 ends the match
                await(await captureTheBlockInstance.from(player1).purchaseToken(1, 0))
 
                let matchData = await captureTheBlockInstance.from(player1).getMatch(1);
                assert.isOk(matchData[4], "Match not ended");
                console.log(ethers.utils.formatUnits(matchData[2], 18))
    
            })
        })
        
    })

    describe('Meta Checks', () => {
        it('Returns the collateral contract address', async () => {
            const collateralAddress = await captureTheBlockInstance.from(adminAccount).collateralAddress();
            assert.equal(collateralAddress, pseudoDaiInstance.contractAddress, "Contract address incorrect");
        });

        it("Returns the current active match correctly", async () => {
            let currentMatchIndex = await captureTheBlockInstance.from(player1).matchIndex();
            assert.isOk(currentMatchIndex.eq(0), "Match incorrect");

            let matchData = await captureTheBlockInstance.from(player1).getMatch(currentMatchIndex);
            assert.isOk(matchData[4], "Initial match slot not set up correctly");

            await(await await captureTheBlockInstance.from(player1).createMatch(matchSetting[0].numberOfSides, matchSetting[0].targetSupply, matchSetting[0].gradient)).wait()

            currentMatchIndex = await captureTheBlockInstance.from(player1).matchIndex();
            assert.isOk(currentMatchIndex.eq(1), "Match incorrect");
        })
    })
})