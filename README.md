# Capture the Block
Two opposing bonding curves, and a fight to capture the flag. The team who gets to the top of the hill first wins the entire collateral pot! The game is multiplayer.

[Capture The Block Webapp](https://capture-the-block.mol.ai/)

[GitHub repository](https://github.com/BenSchZA/capture-the-block)

[Rinkeby CTB Address](https://rinkeby.etherscan.io/address/0x573D6899B7F22E737582dBfa4ca784CF284982A5)

```
RINKEBY_DAI_ADDRESS=0x4d87A619499b754CecB135671ED7Eb5F5071245A
RINKEBY_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0x573D6899B7F22E737582dBfa4ca784CF284982A5
GOERLI_DAI_ADDRESS=0xEA2137a627DaEfE32E19746D329cA196fccc0014
GOERLI_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0x07b82E4960382956992b3BDCCed7fd7c631068C7
```

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
