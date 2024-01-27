import React from "react";
import RenderListQuestion from "./RenderListQuestion";

const SubRowSurveyComponentView = ({ row }) => {
  return <RenderListQuestion surveyData={row.original} />;
};

export default SubRowSurveyComponentView;
