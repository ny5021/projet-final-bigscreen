import React, { useEffect, useMemo, useState } from "react";
import useFetchData from "../../../hook/useAdminFetchData";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubRowAnswerComponentView from "./SubRowAnswerComponentView";
import { FaEye } from "react-icons/fa6";
import { dateFormatTostring } from "../../../utils/dateFormat";
import PageCardWrapper from "../PageCardWrapper/PageCardWrapper";
import PaginationView from "../../../components/PaginationView/PaginationView";
import DatatRowLSpinnerLoader from "../../../components/DefaultRowLoader/DatatRowLSpinnerLoader";
import { Tooltip } from "react-tooltip";
import AlertError from "../../../components/AlertError/AlertError";

export const AdminAnswers = () => {
  const [expanded, setExpanded] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const participantsPromise = useFetchData();

  const columnHelper = createColumnHelper();

  const COLUMN = [
    columnHelper.accessor("survey.title", {
      header: () => "Sondage",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => "Email du participant",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created_at", {
      header: () => "date de participation",
      cell: (info) => dateFormatTostring(info.getValue()),
    }),
    columnHelper.display({
      id: "Action",
      cell: ({ row }) => {
        return (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleClickCollapseRow(row)}
              data-tooltip-id="btn-tooltip"
              data-tooltip-content="Cliquer pour voir les reponse"
            >
              <FaEye />
            </button>
            <Tooltip id="btn-tooltip" place="bottom" />
          </>
        );
      },
    }),
  ];

  const handleClickCollapseRow = (row) => {
    const isExpended = row.getIsExpanded();
    setExpanded(
      (current) => (current = { ...current, [row.index]: !isExpended })
    );
  };
  const params = {
    page: pageIndex,
  };

  useEffect(() => {
    participantsPromise.fetch(`/participants?page${pageIndex}`, params);
  }, [pageIndex, participantsPromise?.abortController]);

  const PAGE_COUNT = useMemo(() => {
    return participantsPromise.data?.meta?.last_page || 1;
  }, [participantsPromise.data]);

  /**
   * Fonction qui active ou désactive l'affichage des sous-elements de la row
   * @param {*} row objet contenant les donnée de la row selectionné
   */
  const handlePageClick = (event) => {
    const nextPage = event.selected + 1;
    setPageIndex(nextPage);
  };

  return (
    <PageCardWrapper pageTitle="Reponses de participants" className="row">
      {participantsPromise.errors && (
        <AlertError message={participantsPromise.errors} />
      )}

      <DataTableCollapse
        columns={COLUMN}
        data={participantsPromise?.data?.data}
        isLoading={participantsPromise.isLoading}
        expanded={expanded}
        renderSubComponent={SubRowAnswerComponentView}
        RowRenderLoader={DatatRowLSpinnerLoader}
      />
      <PaginationView onPageChange={handlePageClick} pageCount={PAGE_COUNT} />
    </PageCardWrapper>
  );
};

export default AdminAnswers;
