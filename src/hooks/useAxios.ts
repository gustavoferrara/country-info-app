import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

import { BackendError } from '@/types/types';

const useAxios = (url?: string, autoTrigger = false) => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<BackendError | null>(null);

  type HandleFinish = () => void;

  const AxiosGet = async (getUrl?: string) => {
    if (!getUrl) getUrl = url;
    if (!getUrl) return;

    setIsPending(true);

    axios
      .get(getUrl)
      .then((res: AxiosResponse) => {
        setData(res.data);
        setError(null);
        setIsPending(false);
      })
      .catch((err: BackendError) => {
        if (err.message !== 'canceled') {
          setError(err);
        }
        setIsPending(false);
      });
  };

  if (autoTrigger) AxiosGet(url);

  interface PostBody {
    data: object;
    config?: AxiosRequestConfig;
  }

  type PostFunction = (body: PostBody, postUrl?: string) => void;

  const axiosPost: PostFunction = (body, postUrl) => {
    if (body) {
      if (!postUrl) postUrl = url;
      if (!postUrl) return;

      setIsPending(true);

      axios
        .post(postUrl, body.data, body.config)
        .then((res: AxiosResponse) => {
          setData(res);
          setError(null);
          setIsPending(false);
        })
        .catch((err: any) => {
          setError(err);
          setIsPending(false);
        });
    }
  };

  const axiosDelete = (deleteUrl?: string, handleFinish?: HandleFinish) => {
    if (!deleteUrl) deleteUrl = url;
    if (!deleteUrl) return;

    setIsPending(true);

    axios
      .delete(deleteUrl)
      .then((res: AxiosResponse) => {
        setData(res);
        setError(null);
        setIsPending(false);
        if (handleFinish) handleFinish();
      })
      .catch((err: any) => {
        setError(err);
        setIsPending(false);
      });
  };

  return {
    data,
    isPending,
    error,
    setData,
    AxiosGet,
    axiosPost,
    axiosDelete,
  };
};

export default useAxios;
