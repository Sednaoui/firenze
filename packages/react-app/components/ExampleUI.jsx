import { Progress } from "antd";
import React, { useState } from "react";

export function ExampleUI({ showStreamUI, tx, amountToSend, timeToSend }) {
  const [percent, setPercent] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(timeToSend);
  //settimeout - call every second
  React.useEffect(() => {
    if (showStreamUI && percent <= 100 && timeRemaining > 0) {
      setTimeout(() => {
        const dec = timeRemaining - 1;
        setTimeRemaining(dec);
        setPercent((1 - dec / timeToSend) * 100);
      }, 1000);
    }
  }, [percent, timeRemaining, timeToSend, showStreamUI]);

  return !showStreamUI ? (
    <h1></h1>
  ) : (
    <div className="flex-container" align="center">
      <h1 fontSize="15px">Money Stream</h1>

      <Progress
        type="circle"
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={Math.round(percent)}
        status="active"
      />

      <h2>Amount of MATIC: {amountToSend}</h2>

      <h2>Time Remaining: {timeRemaining} seconds</h2>
      <a href={tx ? `https://polygonscan.com/tx/${tx.hash}` : ""} rel="noopener noreferrer" target="_blank">
        Transaction on PolygonScan
      </a>
    </div>
  );
}
export default ExampleUI;
