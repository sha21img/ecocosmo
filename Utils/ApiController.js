import axios from 'axios';
export const baseUrl = 'http://delux.trsm.in/api/v1/v2';
export default axiosPostData = async (url, formData) => {
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
