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

                const daiBalanceOfGM = await pseudoDaiInstance.from(player1).balanceOf(captureTheBlockInstance.contractAddress);
                assert.equal(ethers.utils.formatUnits(daiBalanceOfGM, 18), "0.0", "Balance incorrect")
            })
            it('Prices the first token on gradient 3 at 1.5Dai', async () => {
                let priceToBuySideA = await captureTheBlockInstance.from(player1).priceToBuy(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToBuySideA, 18), "1.5", "Price Incorrect")
            })
            it('Purchases the first token successfully', async () => {
                let balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "1000.0", "Balance not initalized correctly")

                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
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
                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                let priceToBuySideA = await captureTheBlockInstance.from(player1).priceToBuy(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToBuySideA, 18), "4.5", "Price Incorrect")
            })
            it('Purchases the second token successfully', async () => {
                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                let priceToBuySideA = await captureTheBlockInstance.from(player1).priceToBuy(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToBuySideA, 18), "4.5", "Price Incorrect")
            })
            
            it('Prices selling the first token on gradient 3 at 1.5Dai', async () => {
                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                let priceToSellSideA = await captureTheBlockInstance.from(player1).rewardForSell(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToSellSideA, 18), "1.5", "Price Incorrect")
            })
            it('Sells the first token successfully', async () => {
                let balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "1000.0", "Balance not initalized correctly")

                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "998.5", "Balance not initalized correctly")

                matchData = await captureTheBlockInstance.from(player1).getMatch(1);
                assert.equal(ethers.utils.formatUnits(matchData[2], 18), "1.5", "Prize not updated correctly")

                const tokenBalanceOnSide = await captureTheBlockInstance.from(player1).getBalanceOf(1,0,player1.wallet.address);

                assert.isOk(tokenBalanceOnSide.eq(1), "Token Balance incorrect")

                const getSidesPoolBalance = await captureTheBlockInstance.from(player1).getMatchSidePoolBalance(1,0);
                assert.equal(ethers.utils.formatUnits(getSidesPoolBalance, 18), "1.5", "Prize not updated correctly")

                await(await captureTheBlockInstance.from(player1).sellToken(0))
                balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "1000.0", "Balance not updated correctly")

                matchData = await captureTheBlockInstance.from(player1).getMatch(1);
                assert.equal(ethers.utils.formatUnits(matchData[2], 18), "0.0", "Prize not updated correctly")

            })
            it('Prices selling the second token correctly', async () => {
                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                let priceToSellSideA = await captureTheBlockInstance.from(player1).rewardForSell(1, 0);
                assert.equal(ethers.utils.formatUnits(priceToSellSideA, 18), "4.5", "Price Incorrect")
            })
            it('Sells the second token successfully', async () => {
                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "994.0", "Balance not updated correctly")

                await(await captureTheBlockInstance.from(player1).sellToken(0))
                balance = await pseudoDaiInstance.from(player1).balanceOf(player1.wallet.address);
                assert.equal(ethers.utils.formatUnits(balance, 18), "998.5", "Balance not initalized correctly")

            })

            describe("Full Matches", () =>{
                it('Plays a match 4 players beat 2 opposing', async () =>{
                    // Side A starts (A:1, B:0)
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
    
                    // Side B takes the lead (A:1, B:2)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))
    
                    // A swarm hits side A (A:5, B:2)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player3).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player3).purchaseToken(0))
    
                    // Side B tries to catch up (A:5, B:4)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))
    
                    // Player 1 panics (A:8, B:4)
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
    
                    // Player 2 is super keen (A:9, B:4)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))
    
                    // Player 6 Wants to hammer it (A:13, B:4)
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
    
                    // Player 2 is so close (A:14, B:4)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))
    
    
                    // Side B is putting up a fight (A:15, B:8)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))
                      
                    // Player 1 ends the match
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
     
                    let matchData = await captureTheBlockInstance.from(player1).getMatch(1);
                    assert.isOk(matchData[4], "Match not ended");
                    assert.equal(ethers.utils.formatUnits(matchData[2], 18), "391.5", "Prize value incorrect")
                })

                it("Distributes winnings succesfully", async ()=>{
                    // Side A starts (A:1, B:0)
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                        
                    // Side B takes the lead (A:1, B:2)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))

                    // A swarm hits side A (A:5, B:2)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player3).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player3).purchaseToken(0))

                    // Side B tries to catch up (A:5, B:4)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))

                    // Player 1 panics (A:8, B:4)
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))

                    // Player 2 is super keen (A:9, B:4)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))

                    // Player 6 Wants to hammer it (A:13, B:4)
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))

                    // Player 2 is so close (A:14, B:4)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))


                    // Side B is putting up a fight (A:15, B:8)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))
                    
                    // Player 1 ends the match
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))

                    let matchData = await captureTheBlockInstance.from(player1).getMatch(1);
                    assert.isOk(matchData[4], "Match not ended");
                    assert.equal(ethers.utils.formatUnits(matchData[2], 18), "391.5", "Prize value incorrect")

                    let player1TokensBalance = await captureTheBlockInstance.from(player1).getBalanceOf(1,0,player1.wallet.address)
                    // Player 1 takes gift
                    await(await captureTheBlockInstance.from(player1).claimWinnings(1));
                    player1TokensBalance = await captureTheBlockInstance.from(player1).getBalanceOf(1,0,player1.wallet.address)

                    await(await captureTheBlockInstance.from(player2).claimWinnings(1));
                    await(await captureTheBlockInstance.from(player3).claimWinnings(1));
                    await(await captureTheBlockInstance.from(player6).claimWinnings(1));
                   
                    const daiBalanceOfGM = await pseudoDaiInstance.from(player1).balanceOf(captureTheBlockInstance.contractAddress);
                    assert.equal(ethers.utils.formatUnits(daiBalanceOfGM, 18), "0.0", "Balance incorrect")
                })

                it("Issues a rematch", async () => {
                    // Side A starts (A:1, B:0)
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                    
                    // Side B takes the lead (A:1, B:2)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))

                    // A swarm hits side A (A:5, B:2)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player3).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player3).purchaseToken(0))

                    // Side B tries to catch up (A:5, B:4)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))

                    // Player 1 panics (A:8, B:4)
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))

                    // Player 2 is super keen (A:9, B:4)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))

                    // Player 6 Wants to hammer it (A:13, B:4)
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))
                    await(await captureTheBlockInstance.from(player6).purchaseToken(0))

                    // Player 2 is so close (A:14, B:4)
                    await(await captureTheBlockInstance.from(player2).purchaseToken(0))


                    // Side B is putting up a fight (A:15, B:8)
                    await(await captureTheBlockInstance.from(player4).purchaseToken(1))
                    await(await captureTheBlockInstance.from(player5).purchaseToken(1))
                    
                    // Player 1 ends the match
                    await(await captureTheBlockInstance.from(player1).purchaseToken(0))

                    let matchData = await captureTheBlockInstance.from(player1).getMatch(1);
                    assert.isOk(matchData[4], "Match not ended");
                    assert.equal(ethers.utils.formatUnits(matchData[2], 18), "391.5", "Prize value incorrect")

                    let player1TokensBalance = await captureTheBlockInstance.from(player1).getBalanceOf(1,0,player1.wallet.address)
                    // Player 1 takes gift
                    await(await captureTheBlockInstance.from(player1).claimWinnings(1));
                    player1TokensBalance = await captureTheBlockInstance.from(player1).getBalanceOf(1,0,player1.wallet.address)

                    await(await captureTheBlockInstance.from(player2).claimWinnings(1));
                    await(await captureTheBlockInstance.from(player3).claimWinnings(1));
                    await(await captureTheBlockInstance.from(player6).claimWinnings(1));
                
                    // Rematch
                    await(await await captureTheBlockInstance.from(player1).createMatch(matchSetting[0].numberOfSides, matchSetting[0].targetSupply, matchSetting[0].gradient)).wait()
                
                    let currentMatchIndex = await captureTheBlockInstance.from(player1).matchIndex();
                    assert.isOk(currentMatchIndex.eq(2), "Match incorrect");
                })
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