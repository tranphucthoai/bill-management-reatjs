import axiosClient from './axiosClient';

const saleReceiptsApi = {
  getAll(params) {
    const url = '/saleReceipts';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/saleReceipts/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/saleReceipts';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/saleReceipts/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/saleReceipts/${id}`;
    return axiosClient.delete(url);
  },
};

export default saleReceiptsApi;
