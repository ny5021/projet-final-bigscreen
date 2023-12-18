import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { DATA_RADAR_CHART } from "./helpers";
import ChartLoader from "./ChartLoader";
import ErrorChart from "./ErrorChart";

const RadarChart = ({ title, data, isLoading = true, error, ...props }) => {
  const CHART_DATA = useMemo(() => data || DATA_RADAR_CHART, [data]);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title">{title}</h5>
      </div>
      {error ? (
        <ErrorChart message={error} />
      ) : (
        <div className="card-body">
          {isLoading ? (
            <ChartLoader />
          ) : (
            <Radar
              data={CHART_DATA}
              {...props}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { position: "right" } },
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RadarChart;
