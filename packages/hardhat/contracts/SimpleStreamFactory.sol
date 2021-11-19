pragma solidity >=0.8.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";

contract SimpleSteamFactory {
   struct Steam {
   address deployedContract;
   address toArtist;
   address fromUser;
   string imageRequestData;
   uint256 frequency;
   uint256 valueSent;
   }

  Steam[] public allSimpleStreams;
  Steam steam;

  function createSimpleStream(address payable _toAddress, uint256 _cap, uint256 _frequency, bool _startsFull, string memory _imageData) public payable {
      
      require(msg.value>=_cap,"You did not send the amount you specified");
      SimpleStream newsimpleStream = new SimpleStream(_toAddress,_cap,_frequency,_startsFull);
      address payable contractAddress = payable(address(newsimpleStream));
      steam = Steam(contractAddress , _toAddress, msg.sender , _imageData, _frequency, _cap );
      
      contractAddress.transfer(msg.value);
      allSimpleStreams.push(steam);
  }
  
   receive() external payable { }
}


contract SimpleStream {

  event Withdraw( address indexed to, uint256 amount, string reason );
  event Deposit( address indexed from, uint256 amount);

  address payable public toAddress;// = payable(0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1);
  uint256 public cap;// = 0.5 ether;
  uint256 public frequency;// 1296000 seconds == 2 weeks;
  uint256 public last;//stream starts empty (last = block.timestamp) or full (block.timestamp - frequency)

  constructor(address payable _toAddress, uint256 _cap, uint256 _frequency, bool _startsFull) public payable {
    toAddress = _toAddress;
    cap = _cap;
    frequency = _frequency;
    if(_startsFull){
      last = block.timestamp - frequency;
    }else{
      last = block.timestamp;
    }
    
 }
  
  function streamBalance() public view returns (uint256){
    if(block.timestamp-last > frequency){
      return cap;
    }
    return (cap * (block.timestamp-last)) / frequency;
  }

  function streamWithdraw(uint256 amount, string memory reason) public {
       require(msg.sender==toAddress,"this stream is not for you");
       uint256 totalAmountCanWithdraw = streamBalance();
       require(totalAmountCanWithdraw>=amount,"not enough in the stream");
       uint256 cappedLast = block.timestamp-frequency;
       if(last<cappedLast){
         last = cappedLast;
       }
       last = last + ((block.timestamp - last) * amount / totalAmountCanWithdraw);
       emit Withdraw( msg.sender, amount, reason );
       toAddress.transfer(amount);
   }

   function streamDeposit() public payable {
      require(msg.value>=cap,"You did not send the amount you specified");
      emit Deposit( msg.sender, msg.value);
    }

   receive() external payable { streamDeposit(); }
}