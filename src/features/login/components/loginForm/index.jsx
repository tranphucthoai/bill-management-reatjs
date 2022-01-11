import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, FormControl, Form, InputGroup, Button } from 'react-bootstrap';
import TextField from './../../../../components/formControls/TextField/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.scss';

LoginForm.propTypes = {};

function LoginForm(props) {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Password ít nhất 10 chữ số').required('Vui lòng nhập password'),
    }),
    onSubmit: async (values) => {
      alert('values', values);
    },
  });
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sx={12} sm={4}>
          <form className="d-flex flex-column justify-content-center align-items-center login-form">
            <h3 className="text-light mb-3">
              <i className="fa fa-user-circle-o me-2"></i>
              Đăng Nhập
            </h3>
            <InputGroup hasValidation className="input-normal mb-3">
              <InputGroup.Text className="input-group-text">
                <i className="fa fa-user"></i>
              </InputGroup.Text>
              <Form.Control as="select" className="btn-reset">
                <Form.Control as="option">Chọn Chi Nhánh</Form.Control>
                <Form.Control as="option">1</Form.Control>
                <Form.Control as="option">1</Form.Control>
              </Form.Control>
            </InputGroup>
            <TextField type="password" form={formik} name="password" icon={'fa fa-key'} placeholder={'Mật khẩu'} />

            <Button variant="danger">Đăng Nhập</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
