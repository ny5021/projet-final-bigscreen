import React, { useEffect } from "react";
import useFetchData from "../../../hook/useAdminFetchData";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../../components/DataTable/DataTable";
import AlertError from "../../../components/AlertError/AlertError";

const RenderListQuestion = ({ surveyData }) => {
  const { fetch, isLoading, data, errors, abortController } = useFetchData();

  useEffect(() => {
    if (!surveyData?.id) return;
    fetch(`/questions/${surveyData?.id}`);
    return () => {
      abortController?.abort();
    };
  }, [abortController, fetch, surveyData.id]);

  const columnHelper = createColumnHelper();
  const COLUMN = [
    columnHelper.accessor("question_number", {
      header: () => "Numéro de la question",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("question_body", {
      header: () => "Corps de la question",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("question_type", {
      header: () => "Type",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div className="card">
      <div className="card-body">
        {errors && <AlertError message={errors} />}

        <DataTable columns={COLUMN} data={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default RenderListQuestion;
