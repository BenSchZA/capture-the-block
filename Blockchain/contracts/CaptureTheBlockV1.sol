pragma solidity 0.5.3;

import { IERC20 } from "./_resources/openzeppelin-solidity/token/ERC20/IERC20.sol";
import { SafeMath } from "./_resources/openzeppelin-solidity/math/SafeMath.sol";

contract CaptureTheBlockV1 {
    using SafeMath for uint256;
    address public collateralAddress_ = address(0);
    mapping(uint256 => Match) private matches;
    uint256 private matchIndex_; 

    struct BondingCurve{
        mapping(address => uint256) balances;
        uint256 poolBalance;
        uint256 totalSupply;
    }

    struct Match{
        mapping(uint8 => BondingCurve) side;
        uint8 winner; 
        uint8 numberOfSides; 
        uint256 targetSupply;
        uint256 prize;
        uint256 gradient;
        bool ended;
    }

    event MatchStarted(uint256 indexed index, uint256 targetSupply);

    event MatchEnded(uint256 indexed index, uint8 indexed winner);

    event TokenPuchased(uint256 indexed index, address indexed player, uint256 daiValue);

    event TokenSold(uint256 indexed index, address indexed player, uint256 daiValue);

    event WinningsClaimed(uint256 indexed index, address indexed player, uint256 tokens, uint256 prize);
   
    constructor(address _collateralAddress) public {
        matchIndex_ = 0;
        collateralAddress_ = _collateralAddress;
        matches[matchIndex_].ended = true;
    }

    function startMatch(uint8 _numberOfSides, uint256 _targetSupply, uint256 _gradient) public returns(bool) {
        require(matches[matchIndex_].ended, "Match still active");
        matchIndex_ = matchIndex_ + 1;
        matches[matchIndex_].gradient = _gradient;
        matches[matchIndex_].numberOfSides = _numberOfSides;
        matches[matchIndex_].targetSupply = _targetSupply;
        emit MatchStarted(matchIndex_, _targetSupply);
        return true;
    }

    function purchaseToken(uint8 _side) public returns(bool){
        require(_side < matches[matchIndex_].numberOfSides, "Invalid Team");
        uint256 daiValue = priceToBuy(matchIndex_, _side);
        require(IERC20(collateralAddress_).transferFrom(msg.sender, address(this), daiValue), "Transfer failed");
        matches[matchIndex_].side[_side].poolBalance = matches[matchIndex_].side[_side].poolBalance.add(daiValue);
        matches[matchIndex_].prize = matches[matchIndex_].prize.add(daiValue);
        matches[matchIndex_].side[_side].balances[msg.sender] = matches[matchIndex_].side[_side].balances[msg.sender] + 1;
        matches[matchIndex_].side[_side].totalSupply = matches[matchIndex_].side[_side].totalSupply + 1;
        emit TokenPuchased(matchIndex_, msg.sender, daiValue);

        if(matches[matchIndex_].side[_side].totalSupply == matches[matchIndex_].targetSupply){
            // End match
            matches[matchIndex_].winner = _side;
            matches[matchIndex_].ended = true;
            emit MatchEnded(matchIndex_, _side);
        }
        return true;
    }

    function sellToken(uint8 _side) public returns(bool){
        require(_side < matches[matchIndex_].numberOfSides, "Invalid Team");
        require(matches[matchIndex_].side[_side].balances[msg.sender] > 0, "User has no tokens remaining");
        uint256 daiValue = rewardForSell(matchIndex_, _side);

        matches[matchIndex_].side[_side].balances[msg.sender] = matches[matchIndex_].side[_side].balances[msg.sender] - 1;
        matches[matchIndex_].side[_side].totalSupply = matches[matchIndex_].side[_side].totalSupply - 1;
        matches[matchIndex_].side[_side].poolBalance = matches[matchIndex_].side[_side].poolBalance.sub(daiValue);

        matches[matchIndex_].prize = matches[matchIndex_].prize.sub(daiValue);
        require(IERC20(collateralAddress_).transfer(msg.sender, daiValue), "Transfer failed");
        emit TokenSold(matchIndex_, msg.sender, daiValue);
        return true;
    }  


    function claimWinnings(uint256 _index) public returns(bool){
        require(matches[_index].ended, "Match not ended");
        require(matches[_index].side[matches[_index].winner].balances[msg.sender] > 0, "No prizes available");
        uint256 portionOfPrize = matches[_index].side[matches[_index].winner].balances[msg.sender];
        matches[_index].side[matches[_index].winner].balances[msg.sender] = 0; 

        uint256 prize = matches[_index].prize.div(matches[_index].targetSupply).mul(portionOfPrize);
        require(IERC20(collateralAddress_).transfer(msg.sender, prize), "Transfer failed");
        emit WinningsClaimed(_index, msg.sender, portionOfPrize, prize);
    }

    // Pricing 
    function priceToBuy(uint256 _index, uint8 _side) public view returns(uint256) {
        return curveIntegral(matches[_index].side[_side].totalSupply.add(1).mul(10 ** 18), matches[_index].gradient).sub(matches[_index].side[_side].poolBalance);
    }

    function rewardForSell(uint256 _index, uint8 _side) public view returns(uint256) {
        return matches[_index].side[_side].poolBalance.sub(curveIntegral(matches[_index].side[_side].totalSupply.sub(1).mul(10 ** 18), matches[_index].gradient));
    }

    // Meta 
    //  numberOfSides,targetSupply, prize, gradientDominator, ended
    function getMatch(uint256 _index) public view returns(uint8, uint256, uint256, uint256, bool) { 
        return (matches[_index].numberOfSides, matches[_index].targetSupply, matches[_index].prize, matches[_index].gradient, matches[_index].ended);
    }

    function getMatchSidePoolBalance(uint256 _index, uint8 _side) public view returns(uint256){
        return matches[_index].side[_side].poolBalance;
    }

    function getBalanceOf(uint256 _index, uint8 _side, address _player) public view returns(uint256){
        return matches[_index].side[_side].balances[_player];
    }

    function matchIndex() public view returns(uint256){
        return matchIndex_;
    }

    function collateralAddress() public view returns(address){
        return collateralAddress_;
    }

    // Math functions
    function curveIntegral(uint256 _x, uint256 _gradient) internal pure returns (uint256) {
        uint256 c = 0;
        return ((_gradient * (_x**2)).div(2).add(c.mul(_x)).div(10**18));
    }
}