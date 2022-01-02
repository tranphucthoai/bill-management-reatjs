import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "./components/SideBar";
import "font-awesome/css/font-awesome.min.css";
import TransfersBill from "./features/transfersBill";

function App() {
  return (
    <main className="main">
      <Container fluid>
        <Row>
          <Col lg={4}>
            <SideBar />
          </Col>
          <Col lg={8}>
            <TransfersBill />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
