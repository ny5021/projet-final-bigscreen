import Cookies from "js-cookie";
import { Outlet, redirect } from "react-router-dom";

/**
 * Gestion des redirection
 * redirection de l'utilisateur en cas de non presence du token
 */
export const useRedirect = () => {
  const TOKEN_STORAGE = Cookies.get(import.meta.env.VITE_TOKEN_STORAGE);
  if (!TOKEN_STORAGE) return redirect("/administration/login");
  return <Outlet />;
};
