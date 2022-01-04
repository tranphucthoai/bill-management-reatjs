import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import RadioGroup from './../../../../components/formControls/RadioGroup/index';
import TextField from './../../../../components/formControls/TextField/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function BillForm() {
  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      senderPhone: Yup.number().min(10, 'Số điện thoại ít nhất 10 chữ số').required('Vui lòng nhập số điện thoại'),
      senderName: Yup.string().min(5, 'Vui lòng nhập họ và tên').required('Vui lòng nhập họ và tên'),
      senderCardId: Yup.number()
        .min(13, 'Số CMND / Hộ chiếu ít nhất 13 chữ số')
        .required('Vui lòng nhập số CMND / Hộ chiếu'),
      senderAddress: Yup.string().required('Vui lòng nhập địa chỉ'),
      receiverPhone: Yup.number().min(10, 'Số điện thoại ít nhất 10 chữ số').required('Vui lòng nhập số điện thoại'),
      receiverName: Yup.string().min(5, 'Vui lòng nhập họ và tên').required('Vui lòng nhập họ và tên'),
      receiverCardId: Yup.number()
        .min(13, 'Số CMND / Hộ chiếu ít nhất 13 chữ số')
        .required('Vui lòng nhập số CMND / Hộ chiếu'),
      receiverAddress: Yup.string().required('Vui lòng nhập địa chỉ'),
      bankPlusPhone: Yup.number().min(10, 'Số điện thoại ít nhất 10 chữ số').required('Vui lòng nhập số điện thoại'),
      transferAmount: Yup.number().min(4, 'Vui lòng nhập số tiền').required('Vui lòng nhập số tiền'),
      transferFee: Yup.number().required('Vui lòng nhập lệ phí'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [formOfReceipt, setFormOfReceipt] = useState(0);
  const [status, setStatus] = useState(0);

  const handleSelectedItem = (name) => {
    setStatus(name);
  };

  const statusProcess = [
    {
      name: 'processed',
      text: 'Đã xử lí',
    },
    {
      name: 'peding',
      text: 'Chưa xử lý',
    },
  ];

  const formPayments = [
    {
      name: 'home',
      text: 'Tại nhà',
    },
    {
      name: 'office',
      text: 'Văn phòng',
    },
    {
      name: 'banking',
      text: 'Chuyển khoản',
    },
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <Row>
        <Col md={6}>
          <h4 className="main-col__title">Thông tin khách gửi</h4>
          <TextField form={formik} type="number" name="senderPhone" icon={'fa-phone'} placeholder={'Nhập điện thoại'} />
          <TextField form={formik} name="senderName" icon={'fa-user-o'} placeholder={'Họ và tên'} />
          <TextField form={formik} name="senderCardId" icon={'fa-id-card-o'} placeholder={'Số CMND / Hộ chiếu'} />
          <TextField form={formik} name="senderAddress" icon={'fa-map-marker'} placeholder={'Địa chỉ'} />
        </Col>
        <Col md={6}>
          <h4 className="main-col__title">Thông tin khách gửi</h4>
          <TextField form={formik} name="receiverPhone" icon={'fa-phone'} placeholder={'Nhập điện thoại'} />
          <TextField form={formik} name="receiverName" icon={'fa-user-o'} placeholder={'Họ và tên'} />
          <TextField form={formik} name="receiverCardId" icon={'fa-id-card-o'} placeholder={'Số CMND / Hộ chiếu'} />
          <TextField form={formik} name="receiverAddress" icon={'fa-map-marker'} placeholder={'Địa chỉ'} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4 className="main-col__title">Thông tin gửi tiền</h4>
          <TextField
            form={formik}
            name="receiverCardId"
            icon={'fa-credit-card-alt'}
            placeholder={'Số tài khoản / Số thẻ'}
          />
          <Row>
            <Col md={6}>
              <TextField form={formik} name="transferAmount" icon={'fa-money'} placeholder={'Số tiền muốn chuyển'} />
            </Col>
            <Col md={6}>
              <TextField form={formik} name="transferFee" icon={'fa-plus'} placeholder={'Lệ phí'} />
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <h4 className="main-col__title">Thông tin khách gửi</h4>
          <TextField form={formik} name="bankPlusPhone" icon={'fa-plus'} placeholder={'Số điện thoại bank plus'} />
          <TextField form={formik} name="paymentAmount" icon={'fa-pause'} placeholder={'Số tiền thanh toán'} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField
            form={formik}
            name="paymentAmountText"
            icon={'fa-text-width'}
            placeholder={'Số tiền thanh toán bằng chữ'}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4 className="main-col__title">Hình thức nhận tiền</h4>
          <RadioGroup nameGroup="formPayments" handleChange={handleSelectedItem} value={formPayments} />
        </Col>
        <Col md={6}>
          <h4 className="main-col__title">Trạng thái xử lý</h4>
          <div className="d-flex">
            <RadioGroup handleChange={handleSelectedItem} nameGroup="status" value={statusProcess} />
            <Button type="submit" variant="md" className="ms-5 btn-reset bg-yellow color-blue">
              <i className="fa fa-print"></i> In
            </Button>
          </div>
        </Col>
      </Row>
    </form>
  );
}

export default BillForm;
