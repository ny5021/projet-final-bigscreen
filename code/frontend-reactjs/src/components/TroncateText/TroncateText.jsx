import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

/**
 *  Sectionne le texte si tro long
 * @param {string} textContent text ou paragraphe
 * @param {*} maxWidth taille maximal en px ou %
 * @returns
 */
const TroncateText = ({ textContent, maxWidth, ...props }) => {
  const defautStyle = { maxWidth: maxWidth || "80%" };
  return (
    <p
      style={defautStyle}
      className={clsx(styles["text-troncate"], props.className)}
    >
      {textContent}
    </p>
  );
};

export default TroncateText;
