import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

function Chart({ bitcoinData }) {
  return (
    <div className="chart">
      <Sparklines data={bitcoinData}>
        <SparklinesLine color="darkblue" />
      </Sparklines>
    </div>
  );
}

export default Chart;
