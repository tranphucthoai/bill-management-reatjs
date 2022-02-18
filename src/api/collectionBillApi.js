import axiosClient from './axiosClient';

const collectionBillApi = {
  getAll(params) {
    const url = '/collectionBill';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/collectionBill/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/collectionBill';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/collectionBill/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/collectionBill/${id}`;
    return axiosClient.delete(url);
  },
};

export default collectionBillApi;
