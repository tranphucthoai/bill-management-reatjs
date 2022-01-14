import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SaleBillForm from '../components/SaleBillForm/index';

SaleBill.propTypes = {};

function SaleBill(props) {
  return (
    <section className="main-col">
      <Row>
        <Col xs={12}>
          <SaleBillForm />
        </Col>
      </Row>
    </section>
  );
}

export default SaleBill;
