import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from "react-bootstrap";
import TextField from './../../components/TextField/index';

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
                    <Row>
                        <Col md={6}>
                            <h4 className="main-col__title">
                                Thông tin khách gửi
                            </h4>

                            <TextField icon={"fa-facebook"} placeholder={"Nhập điện thoại"} />
                        </Col>
                        <Col md={6}>
                            <h4 className="main-col__title">
                                Thông tin khách gửi
                            </h4>

                            <TextField icon={"fa-facebook"} placeholder={"Nhập điện thoại"} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </section>
    );
}

export default TransfersBill;