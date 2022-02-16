import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import saleReceiptsApi from '../../../../api/saleReceiptsApi';
import TextFieldBtn from '../../../../components/formControls/TextFieldBtn/index';
import { formatPrice } from './../../../../constans/common';
import propTypes from 'prop-types';
import queryString from 'query-string';
import moment from 'moment';

SaleBillTable.propTypes = {
  reLoad: propTypes.bool,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  handleView: propTypes.func,
};

function SaleBillTable({ reLoad = false, handleDelete = null, handleEdit = null, handleView = null }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const queryParams = useMemo(() => {
    return {
      phone_like: params.phone_like || '',
    };
  }, [location.search]);

  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    phone_like: '',
  }));

  useEffect(() => {
    (async () => {
      try {
        const respone = await saleReceiptsApi.getAll(queryParams);
        setData(respone);
      } catch (error) {
        console.log('Failed to fetch api', error);
      }
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
    setFilters((prev) => ({
      ...prev,
      phone_like: value,
    }));
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
    setFilters({});
    const filters = {};
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  return (
    <>
      <Row>
        <Col>
          <div className="search-footer">
            <TextFieldBtn
              handleChange={handleChange}
              handleReset={handleReset}
              placeholder={'Nhập số điện thoại để tìm kiếm ...'}
            />
            <Table responsive striped bordered hover className="table-normal">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thông tin khách</th>
                  <th>
                    Loại sản phẩm <br /> Mã số sản phẩm <br /> Ngày bán
                  </th>
                  <th>
                    Số lượng <br />
                    Đơn giá
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
                      {item.saleCatalogId}
                      <br />
                      {item.productNumber}
                      <br />
                      {moment(item.createdAt).format('MM-DD-YYYY')}
                    </td>
                    <td>
                      {item.quantity} x {formatPrice(item.price)}
                    </td>
                    <td>{formatPrice(Number.parseInt(item.price) * Number.parseInt(item.quantity))}</td>
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
          </div>
        </Col>
      </Row>
    </>
  );
}

export default SaleBillTable;
