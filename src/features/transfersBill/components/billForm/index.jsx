import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import RadioGroup from './../../../../components/formControls/RadioGroup/index';
import TextField from './../../../../components/formControls/TextField/index';



BillForm.propTypes = {
    onSubmit: PropTypes.func,
};

function BillForm({ onSubmit }) {
    const schema = yup.object({
        identifier: yup.string()
            .required("Please enter email")
        ,

    }).required();

    const form = useForm({
        defaultValues: {
            identifier: ''
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            onSubmit(values);
        };
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Row>
                <Col md={6}>
                    <h4 className="main-col__title">
                        Thông tin khách gửi
                    </h4>
                    <TextField
                        icon={"fa-phone"}
                        placeholder={"Nhập điện thoại"}
                        form={form}
                        name="identifier"
                        label="identifier"
                        disable={false} />
                    {/* <TextField icon={"fa-user-o"} placeholder={"Họ và tên"} />
                    <TextField icon={"fa-id-card-o"} placeholder={"Số CMND / Hộ chiếu"} />
                    <TextField icon={"fa-map-marker"} placeholder={"Địa chỉ"} /> */}
                </Col>
                <Col md={6}>
                    <h4 className="main-col__title">
                        Thông tin khách gửi
                    </h4>
                    {/* <TextField icon={"fa-phone"} placeholder={"Nhập điện thoại"} />
                    <TextField icon={"fa-user-o"} placeholder={"Họ và tên"} />
                    <TextField icon={"fa-id-card-o"} placeholder={"Số CMND / Hộ chiếu"} />
                    <TextField icon={"fa-map-marker"} placeholder={"Địa chỉ"} /> */}
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h4 className="main-col__title">
                        Thông tin gửi tiền
                    </h4>
                    {/* <TextField icon={"fa-credit-card-alt"} placeholder={"Số tài khoản / Số thẻ"} /> */}

                    <Row>
                        <Col md={6}>
                            {/* <TextField icon={"fa-money"} placeholder={"Số tiền muốn chuyển"} /> */}
                        </Col>
                        <Col md={6}>
                            {/* <TextField icon={"fa-plus"} placeholder={"Lệ phí"} /> */}
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <h4 className="main-col__title">
                        Thông tin khách gửi
                    </h4>
                    {/* <TextField icon={"fa-home"} placeholder={"Ngân hàng"} />
                    <TextField icon={"fa-pause"} placeholder={"Số tiền thanh toán"} /> */}
                </Col>
            </Row>
            <Row>
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

                        <Button variant='md' className='ms-5 btn-reset bg-yellow color-blue'>
                            <i className='fa fa-print'></i> In
                        </Button>
                    </div>
                </Col>
            </Row>
        </form>
    );
}

export default BillForm;