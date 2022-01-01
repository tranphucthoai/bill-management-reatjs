import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <main className="main">
      <Container>
        <Row>
          <Col lg={4}>1</Col>
          <Col lg={8}>2</Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
