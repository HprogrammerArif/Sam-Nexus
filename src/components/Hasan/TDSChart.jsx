import { Chart } from "react-google-charts";
import PropTypes from "prop-types";

const data = [
  ['Day', 'TDS Value'],
  ['9/11', 4],
  ['10/4', 8],
  ['11/1', 15],
  ['12/7', 3],
]

const options = {
  title: "Value Over Time",
  // curveType: Chart,
  legend: { position: "bottom" },
  series: [{ color: "#00FF09" }],
};

const TDSChart = () => {
  return (
    <Chart chartType="LineChart" width="100%" data={data} options={options} />
  );
};

TDSChart.propTypes = {
  data: PropTypes.array,
};

export default TDSChart;