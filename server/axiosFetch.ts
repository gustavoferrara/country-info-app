import axios, { AxiosRequestConfig } from 'axios';

const axiosFetch = async (
  url: string | string[],
  config?: AxiosRequestConfig,
) => {
  if (Array.isArray(url)) {
    return (
      Promise.allSettled(url.map(endpoint => axios.get(endpoint, config)))
        // Axios type declarations for axios.all causing issues
        .then((res: any) => {
          const dataArr: string[] = [];

          res.forEach(
            (element: { value: { data: string }; status: string }) => {
              dataArr.push(element.value.data);
            },
          );

          return dataArr;
        })
        .catch(err => {
          return err;
        })
    );
  } else {
    return axios
      .get(url, config)
      .then(res => {
        if (res.statusText !== 'OK') throw Error(res.statusText);

        return res.data;
      })
      .catch(err => {
        return err.message;
      });
  }
};

export default axiosFetch;
