import React, { useEffect } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";
import RenderListView from "./RenderListView";

const SubRowAnswerComponentView = ({ row }) => {
  /**Récuperation du token du participant **/
  const token = row.original?.token;
  return (
    <div>
      <RenderListView token={token} />
    </div>
  );
};

export default SubRowAnswerComponentView;
