import { useCallback, useEffect, useRef, useState } from "react";
import { adminInstance } from "../services/instance";

/**
 * Effectue une requete de type GET avec insertion du token avec axios interceptor
 * @param {string} url endpoint de l'api qu'on souhaite interrogé ex: /questions
 * @param {object} params objet contenant les parametres de la requete
 * @returns
 */
const useFetchData = () => {
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    errors: null,
  });

  /**
   * contient l'intance de AbortController
   */
  const abortControllerRef = useRef(new AbortController());

  const { isLoading, data, errors } = state;
  const fetch = useCallback(async (url, params) => {
    try {
      setState((prevState) => ({ ...prevState, errors: "", isLoading: true }));

      params = params || {};
      const res = await adminInstance.get(url, {
        signal: abortControllerRef.current?.signal,
        params: { ...params },
      });

      setState((prevState) => ({ ...prevState, data: res.data }));
    } catch (error) {
      if (error.message == "canceled") return;
      let message = error?.response?.data?.message || error.message;

      setState((prevState) => ({ ...prevState, errors: message }));
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, []);

  return {
    isLoading,
    data: data,
    errors,
    fetch,
    abortController: abortControllerRef.current,
  };
};

export default useFetchData;
