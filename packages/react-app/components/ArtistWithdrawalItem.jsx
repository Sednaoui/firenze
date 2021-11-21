import React from 'react'
import { Row, Col, Card, Image, Avatar, Button, Modal, Progress } from "antd";
import tokenabi from "../contracts/GLDToken.json";
import { ethers } from 'arb-ts/node_modules/ethers';
import { Web3Context } from "../helpers/Web3Context";

export function ArtistWithdrawalItem({addressArray}) {
    const web3 = React.useContext(Web3Context);
    // console.log(Contract);
    // const tx = await Contract.streamWithdraw(1, 'hello world')
    
    // console.log(tx);




    console.log(" !!!!!!!!!!!!!!!!");
    const subArray =addressArray[0];
    var simpleStream = new ethers.Contract(subArray[0],tokenabi.abi, web3.userSigner);

    async function withdrawal(){
      var amountWithdrawable  = await simpleStream.streamBalance();
      const tx = await simpleStream.streamWithdraw(amountWithdrawable,"link to transfer");
    } 
    console.log(subArray[0]);
    return(
      
        <Col span={14} key ={addressArray}>
            <Card>
                <div>
                    From: {addressArray[0,1]}
                </div>
                <div>
                    Withdrawable Amount:
                </div>
                <div>
                    Commissioner: {subArray[2]}
                </div>

                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={Math.round(Math.random()*100)}
                    status="active"
                />
                <div>
                    Info on what to draw
                </div>
                <Button onClick={() => {withdrawal();}} >
                    Withdraw Streamed Funds
                </Button>
            </Card>
        </Col>
  );
}

export default ArtistWithdrawalItem