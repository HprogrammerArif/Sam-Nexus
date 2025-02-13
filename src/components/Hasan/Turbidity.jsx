import { Chart } from "react-google-charts";
import PropTypes from "prop-types";

const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

const options = {
  title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

// { data }
const Turbidity = () => {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
};

Turbidity.propTypes = {
  data: PropTypes.array,
};

export default Turbidity;
