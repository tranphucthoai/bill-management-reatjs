import axiosClient from './axiosClient';

const saleBillApi = {
  getAll(params) {
    const url = '/saleBill';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/saleBill/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/saleBill';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/saleBill/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/saleBill/${id}`;
    return axiosClient.delete(url);
  },
};

export default saleBillApi;
