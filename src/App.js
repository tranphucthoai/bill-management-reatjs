import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './app.scss';
import SideBar from './components/SideBar';
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
            {/* <TransfersBill /> */}
            <Login />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
