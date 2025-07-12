import { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";

export const useFetchQuestion = () => {
  const [state, setState] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setState(prev => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        const [{ questions, answers }] = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`
        );

        if (questions.length > 0) {
          setState({ isLoading: false, apiData: questions, serverError: null });
        } else {
          throw new Error("No Question Available");
        }
      } catch (error) {
        setState({ isLoading: false, apiData: [], serverError: error.message || error });
      }
    })();
  }, []);

  return [state, setState];
};