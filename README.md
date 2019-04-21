# Capture the Block
Two opposing bonding curves, and a fight to capture the flag. The team who gets to the top of the hill first wins the entire collateral pot!

[Capture The Block Webapp](https://capture-the-block.mol.ai/)
[GitHub repository](https://github.com/BenSchZA/capture-the-block)

# The technology

Bonding curves enable some interesting dynamics. These dynamics can be complex, introduce interesting game dynamics, but are relatively untested. Capture The Block attaches a well known game, capture the flag, directly to the dynamics of two opposing bonding curves.

# Gameplay

A user enters the site. If there is a game already in play, the user can join immediately and start trading either side of the hill. It is a multiplayer game, so opposing teams are fighting to get to the top of their bonding curve first to secure the collateral of both sides!

This introduces some interesting dynamics. Players are encouraged to pump & dump the other side, perform sybil attacks, etc. - anything that could reasonably happen in the real world while using bonding curves. We want the players to experiment, and that includes digging into the contracts for those willing.

At the end of the game, the team who gets to the top first has the total collateral from both sides fairly redistributed among themselves based on final token ownership.

## Controlled Variables

There are some variables that we design and control to keep gameplay going:
1. The total market collateral
2. The gradient of the curve
3. The step size in tokens

# Dynamics

1. Pump & dump
2. Ramping
3. Sybil attacks

# Variables

1. Tokens - e.g. step size of 5 tokens
2. Collateral - Dai
3. Players - 1v1, allocated simply in contract left/right
4. Start of game - two people in the game
5. End of game - reaching the flag

6. Number of games: single game, distributed, restarted

# Extended features

1. Randomness
2. Incentivizing creation of games: 1 Dai to create, 5% of winnings allocated to creator

# Events

1. Transactions - player username, buy/sell value 
2. Game ticker - summary

# End of Game

Total pot distrubuted based on winning teams distribution of tokens.
