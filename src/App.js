import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './app.scss';
import SideBar from './components/SideBar';
import CollectionBill from './features/collectionBill/pages/index';
import Home from './features/home/pages';
import Login from './features/login/pages';
import ReceiveBill from './features/receiveBill/pages/index';
import SaleBill from './features/saleBill/pages/index';
import TransferBill from './features/transferBill/pages';

function App() {
  const userName = localStorage.getItem('userName');
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
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
