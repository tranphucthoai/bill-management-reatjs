import moment from 'moment';
import propTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import collectionBillApi from '../../../../api/collectionBillApi';
import TextFieldBtn from '../../../../components/formControls/TextFieldBtn/index';
import Loader from '../../../../components/Loader';
import PaginationNormal from '../../../../components/PaginationNormal';
import { formatPrice } from './../../../../constans/common';

CollectionBillTable.propTypes = {
  reLoad: propTypes.bool,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  handleView: propTypes.func,
};

function CollectionBillTable({ reLoad = false, handleDelete = null, handleEdit = null, handleView = null }) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const queryParams = useMemo(() => {
    return {
      phone_like: params.phone_like || '',
      _page: params._page || 1,
      _limit: params._limit || 5,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await collectionBillApi.getAll(queryParams);
        setData(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch api', error);
      }
      setLoader(false);
    })();
  }, [reLoad, queryParams]);
  const onView = (id) => {
    if (!handleView) return;
    handleView(id);
  };
  const onDelete = (id) => {
    if (!onDelete) return;

    handleDelete(id);
  };

  const onEdit = (id, checked) => {
    if (!onEdit) return;
    handleEdit(id, checked);
  };
  const handleChange = (value) => {
    const filters = {
      ...queryParams,
      phone_like: value,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleReset = () => {
    const filters = {
      ...queryParams,
      phone_like: '',
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handlePaginChange = (page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };

  //loader
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <Row>
        <Col>
          <div className="search-footer">
            <TextFieldBtn
              handleChange={handleChange}
              handleReset={handleReset}
              placeholder={'Nhập số điện thoại để tìm kiếm ...'}
              fieldFilter={'phone_like'}
            />
            <Table responsive striped bordered hover className="table-normal">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thông tin khách</th>
                  <th>
                    Loại dịch vụ
                    <br />
                    Số hợp đồng
                  </th>
                  <th>
                    Kỳ hạn
                    <br />
                    Ngày thanh toán
                  </th>
                  <th>Tổng tiền</th>
                  <th>Đã xử lý</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.name}
                      <br />
                      {item.phone}
                      <br />
                      {item.address}
                    </td>
                    <td>
                      {item.collectionCatalogId}
                      <br />
                      {item.serviceNumber}
                    </td>
                    <td>{moment(item.timeForPayment).format('MM-DD-YYYY')}</td>
                    <td>{formatPrice(Number.parseInt(item.totalAmount))}</td>
                    <td>
                      <div className="box-status">
                        <input
                          onChange={(e) => onEdit(item.id, e.target.checked ? 0 : 1)}
                          className="box-status__input"
                          id={`statusTable${item.id}`}
                          type="checkbox"
                          hidden
                          checked={item.status == 0 ? true : false}
                        />
                        <label className="box-status__label" htmlFor={`statusTable${item.id}`}>
                          <i className="fa"></i>
                        </label>
                      </div>
                    </td>
                    <td>
                      <ul className="action">
                        <li>
                          <Button onClick={() => onDelete(item.id)} variant="success" size="sm">
                            <i className="fa fa-trash"></i>
                          </Button>
                        </li>
                        <li>
                          <Button onClick={() => onView(item.id)} variant="danger" size="sm">
                            <i className="fa fa-eye"></i>
                          </Button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <PaginationNormal onChange={handlePaginChange} pagination={pagination} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CollectionBillTable;
