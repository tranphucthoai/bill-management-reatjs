import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CollectionBillForm from '../components/CollectionBillForm';

function CollectionBill() {
  return (
    <section className="main-col">
      <Row>
        <Col xs={12}>
          <CollectionBillForm />
        </Col>
      </Row>
    </section>
  );
}

export default CollectionBill;
