import { Link, useParams } from "react-router-dom";
import style from "./survey.module.css";

const CompletedView = () => {
  const { token } = useParams();
  const URL = `${window.location.protocol}//${window.location.host}/answers/${token}`;

  return (
    <div className="d-flex justify-content-center align-items-center h-100 px-3">
      <div className={`card text-center p-5 ${style.completedCard}`}>
        <h1 className="h2 mb-3">Merci d'avoir participer à ce sondage</h1>
        <p className="lead">
          Vous pourrez consulter ultérieurement vos réponses via ce lien :{" "}
          <Link to={`/answers/${token}`}>{URL}</Link>
        </p>
      </div>
    </div>
  );
};

export default CompletedView;
