import { adminInstance } from "../../../services/instance";

export const QUESTION6_DATA_CHART = {
  labels: [
    "Oculus Quest",
    "Oculus Rift/s",
    "HTC Vive",
    "Windows Mixed Reality",
    "Valve index",
  ],
  datasets: [
    {
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export const QUESTION7_DATA_CHART = {
  labels: ["SteamVR", "Occulus store", "Viveport", "Windows store"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export const QUESTION10_DATA_CHART = {
  labels: [
    "regarder la TV en direct",
    "regarder des films",
    "travailler",
    "jouer en solo",
    "jouer en équipe",
  ],
  datasets: [
    {
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const PieChartBorderColorDefault = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
];
export const PieChartBgColorDefault = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
];

export const INITIAL_PIE_CHART = {
  labels: ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const DATA_RADAR_CHART = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: "Point pour la qualité de l’image sur Bigscreen",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Point pour le confort d’utilisation de l’interface Bigscreen",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Point pour la connexion réseau de Bigscreen",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(255, 206, 86, 0.2)",
      borderColor: "rgba(255, 206, 86, 1)",
      borderWidth: 1,
    },
    {
      label: "Point pour la qualité des graphismes 3D dans Bigscreen",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Point pour la qualité audio dans Bigscreen",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
};

/**
 * Call Api pour récuperer le count  des differente reponse à partir du numero de la question lié a un sondage
 * @param {*} survey_id id du sondage
 * @param {*} question_number numero de la question
 * @returns
 */
export const retrievQuestionValueCountRequest = (
  survey_id,
  question_number,
  signal
) => {
  return adminInstance.get(`/answers/count/value/${survey_id}`, {
    signal,
    params: { question_number },
  });
};
