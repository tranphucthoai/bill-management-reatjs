import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import transferReceiptsApi from '../../../../api/transferReceiptsApi';
import TextFieldBtn from './../../../../components/formControls/TextFieldBtn/index';
import { formatPrice } from './../../../../constans/common';
import { edit } from '../../transfersBillSlice';
import { useDispatch } from 'react-redux';

function BillTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const respone = await transferReceiptsApi.getAll();
        setData(respone);
      } catch (error) {
        console.log('Failed to fetch api', error);
      }
    })();
  }, []);
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(edit());
  };
  return (
    <>
      <Row>
        <Col>
          <div className="search-footer">
            <TextFieldBtn placeholder={'Nhập số điện thoại để tìm kiếm ...'} />

            <Table responsive striped bordered hover className="table-normal">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thông tin khách gửi</th>
                  <th>Thông tin khách nhận</th>
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
                      {item.senderPhone} <br />
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
                      {formatPrice(item.transferAmount)}
                      <br />
                      {formatPrice(item.transferFee)}
                      <br />
                    </td>
                    <td>
                      {formatPrice(item.paymentAmount)}
                      <br />
                      {item.createdAt}
                      <br />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <ul className="action">
                        <li>
                          <Button variant="success" size="sm">
                            <i className="fa fa-trash"></i>
                          </Button>
                        </li>
                        <li>
                          <Button onClick={handleEdit} variant="danger" size="sm">
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

export default BillTable;
