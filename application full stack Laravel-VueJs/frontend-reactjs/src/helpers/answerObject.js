export const formatAnswerObject = (idSurvey, values, data) => {
  const email =
    values["q" + data.filter((question) => question.is_email == true)[0].id];
  let answers = [];
  data.forEach((question) => {
    answers = [
      ...answers,
      { question_id: question.id, value: values["q" + question.id] },
    ];
  });
  const answersObject = {
    survey_id: idSurvey,
    email,
    answers,
  };
  return answersObject;
};

export const APP_TITLE = "Bigscreen";
