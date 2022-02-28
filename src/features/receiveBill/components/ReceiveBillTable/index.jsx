import moment from 'moment';
import propTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { receiveBillApi } from '../../../../api';
import { Loader, PaginationNormal, TextFieldBtn } from '../../../../components';
import { formatPrice } from './../../../../constans';

ReceiveBillTable.propTypes = {
  reLoad: propTypes.bool,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  handleView: propTypes.func,
};

function ReceiveBillTable({ reLoad = false, handleDelete = null, handleEdit = null, handleView = null }) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const queryParams = useMemo(() => {
    return {
      receiverPhone_like: params.receiverPhone_like || '',
      _page: params._page || 1,
      _limit: params._limit || 5,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await receiveBillApi.getAll(queryParams);
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
      receiverPhone_like: value,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleReset = () => {
    const filters = {
      ...queryParams,
      receiverPhone_like: '',
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
              fieldFilter={'receiverPhone_like'}
            />
            <Table responsive striped bordered hover className="table-normal">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thông tin khách gửi</th>
                  <th>Thông tin khác nhận</th>
                  <th>
                    Số tiền nhận
                    <br />
                    Lệ phí
                  </th>
                  <th>
                    Tổng tiền
                    <br />
                    Ngày nhận
                  </th>
                  <th>Đã xử lý</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.senderName}
                      <br />
                      {item.senderPhone}
                      <br />
                      {item.senderAddress}
                    </td>
                    <td>
                      {item.receiverName}
                      <br />
                      {item.receiverPhone}
                      <br />
                      {item.receiverAddress}
                    </td>
                    <td>
                      {formatPrice(Number.parseInt(item.subTotal))} <br />
                      {formatPrice(Number.parseInt(item.fees))}
                    </td>
                    <td>
                      {formatPrice(Number.parseInt(item.grandTotal))}
                      <br />
                      {moment(item.createdAt).format('MM-DD-YYYY')}
                    </td>
                    <td>
                      <div className="box-status">
                        <input
                          onChange={(e) => onEdit(item.id, e.target.checked ? 0 : 1)}
                          className="box-status__input"
                          id={`statusTable${item.id}`}
                          type="checkbox"
                          hidden
                          checked={item.status === 0 ? true : false}
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

export default ReceiveBillTable;
