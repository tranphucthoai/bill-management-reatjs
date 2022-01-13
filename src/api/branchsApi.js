import axiosClient from './axiosClient';

const branchsApi = {
  getAll(params) {
    const url = '/branchs';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/branchs/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/branchs';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/branchs/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/branchs/${id}`;
    return axiosClient.delete(url);
  },
};

export default branchsApi;
