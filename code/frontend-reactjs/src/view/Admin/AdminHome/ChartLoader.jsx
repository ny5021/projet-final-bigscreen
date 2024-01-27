import { TailSpin } from "react-loader-spinner";

const ChartLoader = ({ waitingMessage }) => {
  const WAITING_MESSAGE =
    waitingMessage || "Récupération des données en cours..";

  return (
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
      <p className="mt-4">{WAITING_MESSAGE}</p>{" "}
    </div>
  );
};

export default ChartLoader;
