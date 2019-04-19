pragma solidity 0.5.6;

import { IERC20 } from "./_resources/openzeppelin-solidity/token/ERC20/IERC20.sol";

contract CaptureTheBlock {
    using SafeMath for uint256;
    address private collateralAddress_;
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
        bool ended;
    }

    event MatchStarted(uint8 indexed index, uint256 targetSupply);

    event MatchEnded(uint8 indexed index, uint8 indexed winner);

    event TokenPuchased(uint8 indexed index, address indexed player, uint256 daiValue);

    event TokenSold(uint8 indexed index, address indexed player, uint256 daiValue);

    event WinningsClaimed(uint8 indexed index, address indexed player, uint256 tokens, uint256 prize);
   
    constructor(address _collateralAddress) public {
        matchIndex_ = 0;
        collateralAddress_ = _collateralAddress;
    }

    function createMatch(uint256 _sides, uint256 _targetSupply) public view {
        require(matches[matchIndex_].ended, "Match still active");
        matchIndex_ = matchIndex_ + 1;
    }

    function purchaseToken(uint256 _index, uint8 _side) public returns(bool){
        // Get DAI purchase price for 1 more token
        // require(IERC20(collateralAddress_).transferFrom(msg.sender, address(this), daiValue), "Transfer failed");
        // matches[_index].side[_side].poolBalance = matches[_index].side[_side].poolBalance.add(daiValue);
        // matches[_index].prize = matches[_index].prize.add(daiValue);
        matches[_index].side[_side].balances[msg.sender] = matches[_index].side[_side].balances[msg.sender] + 1;
        matches[_index].side[_side].totalSupply = matches[_index].side[_side].totalSupply + 1;
        // emit TokenPuchased(_index, msg.sender, daiValue);

        if(matches[_index].side[_side].totalSupply == matches[_index].targetSupply){
            // End match
            matches[_index].winner = _side;
            matches[_index].ended = true;
            emit MatchEnded(_index, _side);
        }
        return true;
    }

    function sellToken(uint256 _index, uint8 _side) public returns(bool){
        require(matches[_index].side[_side].balances[msg.sender] > 0, "User has no tokens remaining");
        // Get DAI sale price for 1 more token
        matches[_index].side[_side].balances[msg.sender] = matches[_index].side[_side].balances[msg.sender] - 1;
        matches[_index].side[_side].totalSupply = matches[_index].side[_side].totalSupply - 1;
        // matches[_index].side[_side].poolBalance = matches[_index].side[_side].poolBalance.sub(daiValue);
        // matches[_index].prize = matches[_index].prize.sub(daiValue);
        // require(IERC20(collateralAddress_).transfer(msg.sender, daiValue), "Transfer failed");
        // emit TokenSold(_index, msg.sender, daiValue)
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


    function matchIndex() public view returns(uint256){
        return matchIndex_;
    }

    function collateralAddress() public view returns(address){
        return collateralAddress_;
    }
}