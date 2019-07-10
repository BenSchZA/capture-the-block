# Capture the Block
Two opposing bonding curves, and a fight to capture the flag. The team who gets to the top of the hill first wins the entire collateral pot! The game is multiplayer.

[Capture The Block Webapp](https://capture-the-block.mol.ai/)

[GitHub repository](https://github.com/BenSchZA/capture-the-block)

[Rinkeby CTB Address](https://rinkeby.etherscan.io/address/0x573D6899B7F22E737582dBfa4ca784CF284982A5)

```

RINKEBY_DAI_ADDRESS=0x1745af54FDc8301f7956dB138Ad896f6b18D5409
RINKEBY_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0x81609118C41a01aA1F29632fB98F4a634935F71B

GOERLI_DAI_ADDRESS=0x903Ae021d1916B6B86339074E1a7C7519c93F797
GOERLI_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0xd2Df7201036A3D2c41666d1047D8158B67C01833

MAINNET_DAI_ADDRESS=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359
MAINNET_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0xb01d193A8FC371b0f07dDE747712cC44B2bBc63A

ROPSTEN_DAI_ADDRESS=0x777e1EE78C1D02F62e96CfC5AC4c0d39b5C562D8
ROPSTEN_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0xd6ff590E8Ef60703157482f836Ef242576F361c8

KOVAN_DAI_ADDRESS=0xBa2fb3177E4BF562daD9aE40760989E04B5f8534
KOVAN_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0xacC9dC76BaF506964fDb414CEF05513786363b89
```

[Pay-off Matrix](https://docs.google.com/spreadsheets/d/1HDg7eu00dPJ4zWdco9iPvLqfzp9iKQn6R1mK8vi0xHg/edit?usp=sharing)

# Game Theory

Crypto trading is a significant chunk of blockchain culture. Capture the Block takes the ambitious step of taking crypto trading to the next dimension with competing bonding curves.

The first community to reach the summit of the bond curves, shares in the spoils of the other communities staked collateral.

This introduces a group aspect to game theory where multiple strategies will emerge.

Because since the bond curves are increasing, it becomes harder and harder to reach the summit. Yet at the same time it because more and more profitable for token holders to sell out, despite the detriment to the rest of the group.

The first design takes on the meme theme and will determine which communities are driven by unity and which by greed.

Come play Capture the Block today!

# The technology

Bonding curves enable some interesting dynamics. These dynamics can be complex, introduce interesting game dynamics, but are relatively untested. Capture The Block attaches a well known game, capture the flag, directly to the dynamics of two opposing bonding curves.

Canvas and Phaser 2D game engine allow us to expand gameplay more dynamically.

# Gameplay

A user enters the site. If there is a game already in play, the user can join immediately and start trading either side of the hill. It is a multiplayer game, so opposing teams are fighting to get to the top of their bonding curve first to secure the collateral of both sides!

This introduces some interesting dynamics. Players are encouraged to pump & dump the other side, perform sybil attacks, etc. - anything that could reasonably happen in the real world while using bonding curves. We want the players to experiment, and that includes digging into the contracts for those willing.

At the end of the game, the team who gets to the top first has the total collateral in Dai from both sides fairly redistributed among themselves based on final token ownership.

## Gameplay Settings

There are some variables that we design and control to keep gameplay going:
1. The total market collateral
2. The gradient of the curve
3. The step size in tokens

# Future Features

1. Randomness
2. Incentivizing creation of games: 1 Dai to create, 5% of winnings allocated to creator
3. Multiple games at any given time
4. MMO (massively multi-market online) type gameplay where n number of bonding curves can compete
5. Other games, such as top trumps, tug of war, etc.
6. Integrate CryptoKitties NFTs into the curves!
