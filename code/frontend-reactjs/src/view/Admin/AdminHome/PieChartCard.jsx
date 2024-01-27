import React, { useMemo } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  INITIAL_PIE_CHART,
  PieChartBgColorDefault,
  PieChartBorderColorDefault,
} from "./helpers";
import ChartLoader from "./ChartLoader";
import ErrorChart from "./ErrorChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartCard = ({
  title,
  datas,
  labels,
  backgroundColor,
  borderColor,
  borderWidth,
  isLoading = true,
  error,
  ...props
}) => {
  const CHART_DATA = useMemo(() => {
    return {
      ...INITIAL_PIE_CHART,
      labels: labels,
      datasets: [
        {
          data: datas,
          backgroundColor: backgroundColor || PieChartBgColorDefault,
          borderColor: borderColor || PieChartBorderColorDefault,
          borderWidth: borderWidth || 1,
        },
      ],
    };
  }, [datas, labels]);

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
            <Pie
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

export default PieChartCard;
