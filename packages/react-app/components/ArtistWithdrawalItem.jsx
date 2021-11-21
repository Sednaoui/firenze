import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, Avatar, Button, Modal, Progress } from "antd";
import tokenabi from "../contracts/GLDToken.json";
import { ethers } from 'arb-ts/node_modules/ethers';
import { Web3Context } from "../helpers/Web3Context";


export function ArtistWithdrawalItem({addressArray}) {
    const web3 = React.useContext(Web3Context);
    var [withdrawableAmount, setWithdrawableAmount ] = useState(0);
    console.log(" !!!!!!!!!!!!!!!!");
    const subArray =addressArray[0];
    var simpleStream = new ethers.Contract(subArray[0],tokenabi.abi, web3.userSigner);

     useEffect(() => {
        const fetchData = async () => {
        var amountPossibleToWithdrawal = await simpleStream.streamBalance();
        amountPossibleToWithdrawal = amountPossibleToWithdrawal.toNumber();
        setWithdrawableAmount(amountPossibleToWithdrawal);
        }
        fetchData();
      }, []);
    
    async function withdrawal(){
      var amountWithdrawable  = await simpleStream.streamBalance();
      console.log(amountWithdrawable.toNumber());
      const tx = await simpleStream.streamWithdraw(amountWithdrawable,"link to transfer");
      setWithdrawableAmount(amountWithdrawable);
    } 
    console.log(subArray[0]);
    return(
      
        <Col span={14} key ={addressArray}>
            <Card>
                 <div>
                    <b> Commissioner: </b> {subArray[2]}
                </div>
                <div>
                <b>Withdrawable Amount:</b> {withdrawableAmount} Wei
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