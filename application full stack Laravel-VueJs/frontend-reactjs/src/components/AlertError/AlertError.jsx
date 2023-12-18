import React from "react";

/**
 * Toast Alert
 * @param {*} message Text contenant l'erreur
 * @returns
 */
const AlertError = ({ message }) => {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {message}
    </div>
  );
};

export default AlertError;
