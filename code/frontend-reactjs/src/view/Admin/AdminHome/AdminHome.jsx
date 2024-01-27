import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import PieChartCard from "./PieChartCard";
import RadarChart from "./RadarChart";
import { DATA_RADAR_CHART, retrievQuestionValueCountRequest } from "./helpers";
import {
  ChartDataReducer,
  ERROR_QUESTION,
  ERROR_RADAR,
  UPDATE_QUESTION,
  UPDATE_RADAR_DATA,
  initialState,
} from "./reducer/initialData";
import styles from "./styles.module.css";
import BarChartCard from "./BarChartCard";

const AdminHome = () => {
  const [charDataState, dispatchChartData] = useReducer(
    ChartDataReducer,
    initialState
  );

  const radarFetchAbortControllerRef = useRef(new AbortController());
  const pieFetchAbortControllerRef = useRef(new AbortController());
  const survey = "bigscreen";

  /**
   * requete le serveur afin d'obtenir les resultat des question 6,7 et 10
   * retourne le tableaus des valeurs à inserer dans le datasets
   */
  const fetchforPieChart = useCallback(async () => {
    const forQuestions = [6, 7, 10];

    for (const question_number of forQuestions) {
      try {
        const promise_question = await retrievQuestionValueCountRequest(
          survey,
          question_number,
          radarFetchAbortControllerRef.current?.signal
        );
        const data = [...promise_question.data].map((data) => data.count);
        const labels = [...promise_question.data].map((data) => data.value);

        dispatchChartData({
          type: UPDATE_QUESTION,
          payload: {
            question_number,
            data: { labels, data },
            isLoading: false,
          },
        });
      } catch (error) {
        let message = error.message;

        if (error.response?.data) {
          message = error.response?.data?.message;
        }
        error.message != "canceled" &&
          dispatchChartData({
            type: ERROR_QUESTION,
            payload: { question_number, error: message },
          });
      }
    }
  }, []);

  /**
   * requete le serveur afin d'obtenir les resultat des question 11 à 15
   * retourne le tableaus des valeurs à inserer dans le datasets
   */
  const fetchForRadarChart = useCallback(async () => {
    const forQuestions = [11, 12, 13, 14, 15];
    let datasets = [...DATA_RADAR_CHART.datasets];
    try {
      for (const [index, question_number] of forQuestions.entries()) {
        const promise_question = await retrievQuestionValueCountRequest(
          survey,
          question_number,
          pieFetchAbortControllerRef.current?.signal
        );
        const data = [...promise_question.data].map((answer) => answer.count);

        datasets = [...datasets].map((v, i) => {
          if (i == index) {
            return { ...v, data };
          }
          return v;
        });
        const labels = Array.from({ length: 5 }, (_, i) => i + 1);
        dispatchChartData({
          type: UPDATE_RADAR_DATA,
          payload: {
            labels,
            datasets,
            isLoading: false,
          },
        });
      }
    } catch (error) {
      let message = error.message;

      if (error.response?.data) {
        message = error.response?.data?.message;
      }

      error.message != "canceled" &&
        dispatchChartData({
          type: ERROR_RADAR,
          payload: { error: message },
        });
    }
  }, []);

  useEffect(() => {
    fetchforPieChart();
    fetchForRadarChart();
    return () => {
      pieFetchAbortControllerRef.current?.abort();
      radarFetchAbortControllerRef.current?.abort();
    };
  }, []);

  return (
    <>
      <div className={styles["grid-row-charts"]}>
        <div className={styles["col-a"]}>
          <BarChartCard
            title={`Question 6: Quel marque de casque VR utilisez-vous ?`}
            labels={charDataState.question6.labels}
            datas={charDataState.question6.data}
            isLoading={charDataState.question6.isLoading}
            error={charDataState.question6.error}
          />
        </div>
        <div className={styles["col-b"]}>
          <BarChartCard
            title={`Question 7: Sur quel magasin d’application achetez vous des contenus VR ?`}
            labels={charDataState.question7.labels}
            datas={charDataState.question7.data}
            isLoading={charDataState.question7.isLoading}
            error={charDataState.question7.error}
          />
        </div>

        <div className={styles["col-c"]}>
          <PieChartCard
            title={`Question 10: Vous utilisez principalement Bigscreen pour :`}
            labels={charDataState.question10.labels}
            datas={charDataState.question10.data}
            isLoading={charDataState.question10.isLoading}
            error={charDataState.question10.error}
          />
        </div>
        <div className={styles["col-d"]}>
          <BarChartCard
            title="Question 11 à 15"
            data={{
              datasets: charDataState.radarChartData.datasets,
              labels: charDataState.radarChartData.labels,
            }}
            isLoading={charDataState.radarChartData.isLoading}
            error={charDataState.radarChartData.error}
          />
        </div>
      </div>
    </>
  );
};

const defaultStyle = {
  width: "100%",
  height: "auto",
  display: "flex",
  placeItem: "center",
};
export default AdminHome;
