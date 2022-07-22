import axios from 'axios';
export const baseUrl = 'http://54.169.20.116/external_ec_apps/api/v3';
export const axiosPostData = async (url, formData) => {
  return axios
    .post(`${baseUrl}/${url}`, formData, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err.response.status === 401) {
        window.location.reload(false);
      }
      return err;
    });
};

export const axiosGetData = async url => {
  return axios
    .get(`${baseUrl}/${url}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err.response.status === 401) {
        window.location.reload(false);
      }
      return err;
    });
};