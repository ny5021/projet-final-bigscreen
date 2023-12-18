import React from "react";
import { Link } from "react-router-dom";
import style from "./home.module.css";
import { APP_TITLE } from "../../../helpers/answerObject";

const HomeView = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 px-3">
      <div className={`card text-center p-5 ${style.homeCard}`}>
        <h1 className="mb-4">{APP_TITLE} notre plateforme de sondage </h1>
        
        <p className="lead mb-4">
          Nous aimerons avoir votre avis sur des questions essentielles afin d'améliorer notre qualité de service. 
          Merci pour votre contribution !
        </p>
        <p>
          {
            <Link
              to={"/survey/bigscreen"}
              className="btn btn-primary"
            >
              Participer au sondage
            </Link>
          }
        </p>
      </div>
    </div>
  );
};

export default HomeView;
