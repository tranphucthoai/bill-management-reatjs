import axiosClient from './axiosClient';

const transferReceiptsApi = {
  getAll(params) {
    const url = '/transferReceipts';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/transferReceipts/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/transferReceipts';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = '/transferReceipts';
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/transferReceipts/${id}`;
    return axiosClient.delete(url);
  },
};

export default transferReceiptsApi;
