import axiosClient from './axiosClient';

const transferBillApi = {
  getAll(params) {
    const url = '/transferBill';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/transferBill/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/transferBill';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/transferBill/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/transferBill/${id}`;
    return axiosClient.delete(url);
  },
};

export default transferBillApi;
