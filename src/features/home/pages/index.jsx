import React from 'react';
import { Col, Row } from 'react-bootstrap';
import HomeCard from './../components/HomeCard/index';
import './style.scss';
import { Heading } from './../../../components';

Home.propTypes = {};

function Home(props) {
  const data = [
    {
      id: 1,
      title: 'Hoá Đơn Bán Hàng',
      url: '/saleBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024229/samples/bill-management/HoaDonBanHang_olfggh.jpg',
    },
    {
      id: 2,
      title: 'Hoá Đơn Thu Hộ',
      url: '/collectionBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024230/samples/bill-management/HoaDonThuHo_rpwm1e.jpg',
    },
    {
      id: 3,
      title: 'Hoá Đơn Chuyển Tiền',
      url: '/transferBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024229/samples/bill-management/HoaDonChuyenTien_oehllu.jpg',
    },
    {
      id: 4,
      title: 'Hoá Đơn Nhận Tiền',
      url: '/receiveBill',
      thumb:
        'https://res.cloudinary.com/dhyime7g0/image/upload/v1641024230/samples/bill-management/HoaDonNhanTien_mhn8op.png',
    },
  ];
  return (
    <section className="main-col">
      <Heading hideBtnAdd={true} />
      <Row className="flex-space-20 align-items-center mt-2 mt-lg-0">
        {data.map((item) => (
          <Col key={item.id} sm={6}>
            <HomeCard data={item} />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default Home;
