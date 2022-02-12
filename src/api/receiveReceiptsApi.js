import axiosClient from './axiosClient';

const receivedReceiptsApi = {
  getAll(params) {
    const url = '/receivedReceipts';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/receivedReceipts/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/receivedReceipts';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/receivedReceipts/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/receivedReceipts/${id}`;
    return axiosClient.delete(url);
  },
};

export default receivedReceiptsApi;
