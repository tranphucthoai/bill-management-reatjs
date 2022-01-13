import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, FormControl, Form, InputGroup, Button } from 'react-bootstrap';
import TextField from './../../../../components/formControls/TextField/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.scss';
import branchsApi from './../../../../api/branchsApi';
import SelectField from './../../../../components/formControls/SelectField/index';
import { useDispatch } from 'react-redux';
import { login } from '../../loginSlice';
import { useNavigate } from 'react-router-dom';
LoginForm.propTypes = {};

function LoginForm(props) {
  const [branchs, setBranchs] = useState([]);
  const [selectVal, setSelectVal] = useState('TruongTho');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Password ít nhất 6 chữ số').required('Vui lòng nhập password'),
    }),
    onSubmit: async (values) => {
      const branchItem = branchs.find((branch) => branch.id === selectVal);
      if (values['password'] === branchItem.password) {
        dispatch(login(selectVal));
        localStorage.setItem('userName', selectVal);
        navigate(`/home`);
      } else {
        formik.setErrors({ password: 'Sai mật khẩu' });
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const respone = await branchsApi.getAll();
        setBranchs(respone);
      } catch (error) {
        console.log('Failed to fetch api', error);
      }
    })();
  }, []);
  const handleChangeSelect = (value) => {
    setSelectVal(value);
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sx={12} sm={4}>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column justify-content-center align-items-center login-form"
          >
            <h3 className="text-light mb-3">
              <i className="fa fa-user-circle-o me-2"></i>
              Đăng Nhập
            </h3>
            <SelectField
              form={formik}
              handleChange={handleChangeSelect}
              name="selectUser"
              icon="fa-user"
              data={branchs}
              selectVal={selectVal}
            />
            <TextField type="password" form={formik} name="password" icon={'fa fa-key'} placeholder={'Mật khẩu'} />
            <Button type="submit" variant="danger">
              Đăng Nhập
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
