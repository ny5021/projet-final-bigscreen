/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import HomeView from "../view/client/HomeView/HomeView";
import SurveyView from "../view/client/SurveyView/SurveyView";
import CompletedView from "../view/client/SurveyView/CompletedView";
import AdminLayout from "../view/layout/AdminLayout/AdminLayout";

import AdminLogin from "../view/Admin/AdminLogin/AdminLogin";
import AdminQuestions from "../view/Admin/AdminQuestions/AdminQuestions";
import { useRedirect } from "./AuthRedirect";
import AnswerView from "../view/client/AnswerView/AnswerView";
import AdminHome from "../view/Admin/AdminHome/AdminHome";
import AdminAnswers from "../view/Admin/AdminAnswers/AdminAnswers";

export default createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/survey/:surveyToken",
    element: <SurveyView />,
  },
  {
    path: "/completed/:token",
    element: <CompletedView />,
  },
  {
    path: "/answers/:token",
    element: <AnswerView />,
  },
  {
    path: "administration/login",
    element: <AdminLogin />,
  },
  {
    loader: useRedirect,
    path: "administration",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "questions",
        element: <AdminQuestions />,
      },
      {
        path: "answers",
        element: <AdminAnswers />,
      },
    ],
  },
]);
