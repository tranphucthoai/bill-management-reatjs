import React from 'react';
import PropTypes from 'prop-types';
import HomeCard from './../components/HomeCard/index';
import { Col, Row } from 'react-bootstrap';
import './style.scss';

Home.propTypes = {};

function Home(props) {
  const data = [
    {
      id: 1,
      title: 'Hoá Đơn Bán Hàng',
      url: '/salesBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024229/samples/bill-management/HoaDonBanHang_olfggh.jpg',
    },
    {
      id: 2,
      title: 'Hoá Đơn Thu Hộ',
      url: '/receiptsBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024230/samples/bill-management/HoaDonThuHo_rpwm1e.jpg',
    },
    {
      id: 3,
      title: 'Hoá Đơn Chuyển Tiền',
      url: '/transfersBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024229/samples/bill-management/HoaDonChuyenTien_oehllu.jpg',
    },
    {
      id: 4,
      title: 'Hoá Đơn Nhận Tiền',
      url: '/receiptsBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024230/samples/bill-management/HoaDonNhanTien_mhn8op.png',
    },
  ];
  return (
    <section className="main-col">
      <Row className="flex-space-20 align-items-center">
        {data.map((item) => (
          <Col sm={6}>
            <HomeCard key={item.id} data={item} />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default Home;
