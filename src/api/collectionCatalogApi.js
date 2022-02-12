import axiosClient from './axiosClient';

const collectionCatalogApi = {
  getAll(params) {
    const url = '/collectionCatalogs';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/collectionCatalogs/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/collectionCatalogs';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/collectionCatalogs/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/collectionCatalogs/${id}`;
    return axiosClient.delete(url);
  },
};

export default collectionCatalogApi;
