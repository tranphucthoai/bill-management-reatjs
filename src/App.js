import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './app.scss';
import SideBar from './components/SideBar';
import Home from './features/home/pages';
import Login from './features/login/pages';
import TransfersBill from './features/transfersBill/pages';

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
              <Route path="/transfersBill" element={<TransfersBill />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
