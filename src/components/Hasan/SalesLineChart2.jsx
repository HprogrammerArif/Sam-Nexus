import { Chart } from "react-google-charts";
import PropTypes from "prop-types";

const data = [
  ['Day', 'PH Value'],
  ['9/11', 4],
  ['10/4', 8],
  ['11/1', 15],
  ['12/7', 3],
]

const options = {
  title: "Value Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};
// { data }
const SalesLineChart2 = () => {
  return (
    <Chart chartType="LineChart" width="100%" data={data} options={options} />
  );
};

SalesLineChart2.propTypes = {
  data: PropTypes.array,
};

export default SalesLineChart2;
