import axiosClient from './axiosClient';

const receivedReceiptsApi = {
  getAll(params) {
    const url = '/receiveReceipts';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/receiveReceipts/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/receiveReceipts';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/receiveReceipts/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/receiveReceipts/${id}`;
    return axiosClient.delete(url);
  },
};

export default receivedReceiptsApi;
