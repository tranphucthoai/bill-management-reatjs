import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './app.scss';
import { MenuMobile, SideBar } from './components';
import { CollectionBill, Home, Login, ReceiveBill, SaleBill, TransferBill } from './features';

function App() {
  return (
    <main className="main">
      <Container fluid>
        <Row>
          <Col xl={3}>
            <SideBar />
          </Col>
          <Col xl={9}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/transferBill" element={<TransferBill />} />
              <Route path="/saleBill" element={<SaleBill />} />
              <Route path="/collectionBill" element={<CollectionBill />} />
              <Route path="/receiveBill" element={<ReceiveBill />} />
            </Routes>
            <MenuMobile />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
