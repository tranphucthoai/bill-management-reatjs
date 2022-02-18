import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LoginForm from '../components/loginForm';

function Login() {
  return (
    <section className="main-col">
      <Row>
        <Col xs={12}>
          <LoginForm />
        </Col>
      </Row>
    </section>
  );
}

export default Login;
