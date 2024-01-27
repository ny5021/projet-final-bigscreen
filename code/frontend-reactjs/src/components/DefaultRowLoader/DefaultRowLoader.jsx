import React from "react";

const DefaultRowLoader = ({ columnsTotalCount }) => {
  const COLUMNS_COUNT = columnsTotalCount || 1;
  return (
    <tr>
      <td colSpan={COLUMNS_COUNT}>
        <p className="text-center my-4">Chargement des données...</p>{" "}
      </td>
    </tr>
  );
};

export default DefaultRowLoader;
