import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import styles from "./styles.module.css";

const ErrorChart = ({
  message = "Une erreur et survenue sur le serveur distant",
}) => {
  return (
    <div className="card-body">
      <div
        className=" alert alert-danger d-flex justify-content-center align-items-center flex-column h-100"
        role="alert"
      >
        <div>
          <p className="text-center">
            <BiSolidErrorCircle className={styles["error-icon"]} />
          </p>
          <p className="my-3">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorChart;
