import axiosClient from './axiosClient';

const collectionReceiptsApi = {
  getAll(params) {
    const url = '/collectionReceipt';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/collectionReceipt/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/collectionReceipt';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/collectionReceipt/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/collectionReceipt/${id}`;
    return axiosClient.delete(url);
  },
};

export default collectionReceiptsApi;
