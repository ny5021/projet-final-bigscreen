import React from "react";
import styles from "./style.module.css";
import { TailSpin } from "react-loader-spinner";

const DatatRowLSpinnerLoader = ({ rowTotalCount }) => {
  const COUNT_TOTAL_ROW = rowTotalCount ? rowTotalCount : 25;

  return (
    <tr>
      <td colSpan={COUNT_TOTAL_ROW}>
        <div className={styles.rowLoader}>
          <div className="d-flex align-items-center w-100 flex-column">
            <TailSpin
              height="80"
              width="80"
              color="#3B7DDD"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p className="mt-4">Chargement des données...</p>{" "}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DatatRowLSpinnerLoader;
