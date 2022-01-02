import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Table } from "react-bootstrap";
import TextField from './../../components/TextField/index';
import './style.scss'
import RadioGroup from './../../components/RadioGroup/index';

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
                            <TextField icon={"fa-phone"} placeholder={"Nhập điện thoại"} />
                            <TextField icon={"fa-user-o"} placeholder={"Họ và tên"} />
                            <TextField icon={"fa-id-card-o"} placeholder={"Số CMND / Hộ chiếu"} />
                            <TextField icon={"fa-map-marker"} placeholder={"Địa chỉ"} />
                        </Col>
                        <Col md={6}>
                            <h4 className="main-col__title">
                                Thông tin khách gửi
                            </h4>
                            <TextField icon={"fa-phone"} placeholder={"Nhập điện thoại"} />
                            <TextField icon={"fa-user-o"} placeholder={"Họ và tên"} />
                            <TextField icon={"fa-id-card-o"} placeholder={"Số CMND / Hộ chiếu"} />
                            <TextField icon={"fa-map-marker"} placeholder={"Địa chỉ"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h4 className="main-col__title">
                                Thông tin gửi tiền
                            </h4>
                            <TextField icon={"fa-credit-card-alt"} placeholder={"Số tài khoản / Số thẻ"} />

                            <Row>
                                <Col md={6}>
                                    <TextField icon={"fa-money"} placeholder={"Số tiền muốn chuyển"} />
                                </Col>
                                <Col md={6}>
                                    <TextField icon={"fa-plus"} placeholder={"Lệ phí"} />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <h4 className="main-col__title">
                                Thông tin khách gửi
                            </h4>
                            <TextField icon={"fa-home"} placeholder={"Ngân hàng"} />
                            <TextField icon={"fa-pause"} placeholder={"Số tiền thanh toán"} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={6}>
                            <h4 className="main-col__title">
                                Hình thức nhận tiền
                            </h4>
                            <RadioGroup nameGroup='formPayments' value={[{
                                "name": "home",
                                "text": "Tại nhà",
                            }, {
                                "name": "office",
                                "text": "Văn phòng",
                            }, {
                                "name": "banking",
                                "text": "Chuyển khoản",
                            }
                            ]} />
                        </Col>
                        <Col md={6}>
                            <h4 className="main-col__title">
                                Trạng thái xử lý
                            </h4>

                            <div className='d-flex'>
                                <RadioGroup nameGroup='status' value={[{
                                    "name": "processed",
                                    "text": "Đã xử lí",
                                }, {
                                    "name": "peding",
                                    "text": "Chưa xử lý",
                                }
                                ]} />

                                <Button variant="warning ms-5 btn-default color-blue">
                                    <i className='fa fa-print'></i>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan={2}>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </section>
    );
}

export default TransfersBill;