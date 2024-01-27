import React from "react";
import { revokeToken } from "../../services/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPowerOff } from "react-icons/fa6";

const LogoutBtn = () => {
  const [isLoading, setisloading] = React.useState(false);

  const navigate = useNavigate();
  const AUTH_TOKEN = import.meta.env.VITE_TOKEN_STORAGE;

  const resetAction = async () => {
    setisloading(true);
    try {
      revokeToken();
      Cookies.remove(AUTH_TOKEN);
      navigate("/administration/login", { replace: true });
    } catch (error) {
      console.log(error.message);
    } finally {
      setisloading(false);
    }
  };

  const TEXT_BTN = isLoading ? "Deconnexion en cours" : "Déconnexion";

  return (
    <button
      className="btn btn-primary d-flex align-items-center"
      type="button"
      onClick={resetAction}
      disabled={isLoading}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Default tooltip"
    >
      <FaPowerOff className="me-1" />
      {TEXT_BTN}
    </button>
  );
};

export default LogoutBtn;
