import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import transferReceiptsApi from '../../../api/transferReceiptsApi';
import BillForm from '../components/billForm';
import BillTable from '../components/billTable';
import './style.scss';

TransfersBill.propTypes = {

};

function TransfersBill(props) {

    return (
        <section className='main-col'>
            <Row>
                <Col xs={12}>
                    <h2 className="main-col__heading">
                        Hóa đơn chuyển tiền
                    </h2>
                </Col>
                <Col xs={12}>
                    <BillForm />
                    <BillTable />
                </Col>
            </Row>
        </section>
    );
}

export default TransfersBill;