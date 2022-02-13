import axiosClient from './axiosClient';

const banksApi = {
  getAll(params) {
    const url = '/banks';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/banks/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/banks';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/banks/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/banks/${id}`;
    return axiosClient.delete(url);
  },
};

export default banksApi;
