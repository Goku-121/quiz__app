import { useEffect } from 'react';
import { postServerData } from '../helper/helper';

export const usePublishResult = (resultData) => {
  useEffect(() => {
    if (!resultData) return;

    const { result, username } = resultData;

    if (!username || (Array.isArray(result) && result.length === 0)) return;

    (async () => {
      try {
        await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [resultData]);  // depend on resultData, so effect runs on change
};
