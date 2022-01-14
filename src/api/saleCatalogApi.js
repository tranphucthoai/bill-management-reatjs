import axiosClient from './axiosClient';

const saleCatalogApi = {
  getAll(params) {
    const url = '/saleCatalogs';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/saleCatalogs/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/saleCatalogs';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/saleCatalogs/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/saleCatalogs/${id}`;
    return axiosClient.delete(url);
  },
};

export default saleCatalogApi;
