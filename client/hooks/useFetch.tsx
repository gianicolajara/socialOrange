import { useState } from "react";
import { getFetch, postFetch } from "../utils/fetching";

const initialLoading: boolean = false;
const initialData: any = null;
const initialError: any = null;

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [data, setData] = useState<any>(initialData);
  const [errors, setErrors] = useState<any>(initialError);

  const get = ({
    pathUrl = "",
    withCredentials = false,
    onSuccess = () => {},
  }) => {
    setLoading(true);
    getFetch({
      pathUrl,
      withCredentials,
    })
      .then((res) => {
        setData(res.data);
        setErrors(initialError);
        onSuccess();
      })
      .catch((err) => {
        setErrors(err);
        setData(initialData);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const post = ({
    pathUrl = "",
    withCredentials = false,
    data = {},
    onSuccess = () => {},
  }) => {
    postFetch({
      pathUrl,
      withCredentials,
      data,
    })
      .then((res) => {
        setData(res.data);
        setErrors(initialError);
        onSuccess();
      })
      .catch((err) => {
        setErrors(err);
        setData(initialData);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    data,
    errors,
    post,
    get,
  };
};

export default useFetch;
