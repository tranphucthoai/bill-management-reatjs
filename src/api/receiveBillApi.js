import axiosClient from './axiosClient';

const receiveBillApi = {
  getAll(params) {
    const url = '/receiveBill';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/receiveBill/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/receiveBill';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/receiveBill/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/receiveBill/${id}`;
    return axiosClient.delete(url);
  },
};

export default receiveBillApi;
