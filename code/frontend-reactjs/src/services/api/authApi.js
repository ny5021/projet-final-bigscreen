import Cookies from "js-cookie";
import { adminInstance, instance } from "../instance";

/**
 *
 * @param {*} body donnée à soumettre
 *
 * ```js
 * {email:"email@email.com" , passsword:"motdepasse" }
 *
 * ```
 *
 * @returns
 */
export const login = (body) => {
  const { email, password } = body;
  return instance.post("/login", { email, password });
};

/**
 * demande de suppression du token enregistré au serveur
 */
export const revokeToken = () => {
  return adminInstance.post("/revokeToken");
};
