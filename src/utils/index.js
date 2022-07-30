const getUrlSearchParams = () => {
  return new URLSearchParams(window.location.search);
};

export const getUrlQueryParams = () => {
  const queryParams = getUrlSearchParams();

  const resultParams = {};

  queryParams.forEach((value, key) => {
    (resultParams)[key] = value;
  });

  return resultParams;
};

export const setUrlQueryParams = (params) => {
  const queryParams = getUrlSearchParams();

  for (const param in params) {
    if (!(params)[param]) {
      queryParams.delete(param);
    } else {
      queryParams.set(param, (params)[param]);
    }
  }

  history.pushState(null, "", "?" + queryParams.toString());
};

export const formatNumber = (value) => {
  return value.toLocaleString();
};