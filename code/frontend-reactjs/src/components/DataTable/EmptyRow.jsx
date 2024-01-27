import React from "react";

const EmptyRow = ({ emptyMessage, ...props }) => {
  const EMPTY_MESSAGE = emptyMessage || "Aucun résultat";

  return (
    <tr {...props}>
      <td colSpan={25}>{EMPTY_MESSAGE}</td>
    </tr>
  );
};

export default EmptyRow;
