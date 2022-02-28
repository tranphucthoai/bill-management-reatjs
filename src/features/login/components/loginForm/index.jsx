import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../loginSlice';
import { branchsApi } from './../../../../api';
import { Loader, SelectField, TextField } from './../../../../components';
import './style.scss';

function LoginForm() {
  const [branchs, setBranchs] = useState([]);
  const [selectVal, setSelectVal] = useState('TruongTho');
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '123456789',
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
      setLoader(false);
    })();
  }, []);
  const handleChangeSelect = (value) => {
    setSelectVal(value);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sx={12} sm={8} md={6} lg={4}>
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
