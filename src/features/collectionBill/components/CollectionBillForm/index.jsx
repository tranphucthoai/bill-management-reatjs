import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { default as VNnum2words } from 'vn-num2words';
import * as Yup from 'yup';
import collectionReceiptsApi from '../../../../api/collectionReceiptsApi';
import RadioGroup from '../../../../components/formControls/RadioGroup/index';
import SelectField from '../../../../components/formControls/SelectField';
import TextField from '../../../../components/formControls/TextField/index';
import { create, edit } from '../../collectionBillSlice';
import CollectionBillTable from './../collectionBillTable/index';
import collectionCatalogApi from './../../../../api/collectionCatalogApi';

CollectionBillForm.propTypes = {};

function CollectionBillForm(props) {
  const [reLoad, setReload] = useState(false);
  const [statusSelected, setStatusSelected] = useState(0);
  const dispatch = useDispatch();
  const { isUpdate, idItem } = useSelector((state) => state.collectionBill);
  const [collectionCatalogs, setCollectionCatalogs] = useState([]);
  const [selectVal, setSelectVal] = useState('');

  //call api load data table

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const respone = await collectionReceiptsApi.get('');
  //     } catch (error) {
  //       console.log('Failed to fetch Api', error);
  //     }
  //   })();
  // }, []);

  //init formik

  const initValForm = {
    phone: '',
    name: '',
    address: '',
    price: '',
    serviceNumber: '',
    paymentAmount: '',
    timeForPayment: 0,
  };
  const currentDate = new Date(Date.now()).toISOString().slice(0, 10);

  const formik = useFormik({
    initialValues: initValForm,
    validationSchema: Yup.object({
      phone: Yup.number().min(10, 'Số điện thoại ít nhất 10 chữ số').required('Vui lòng nhập số điện thoại'),
      name: Yup.string().min(5, 'Vui lòng nhập họ và tên').required('Vui lòng nhập họ và tên'),
      address: Yup.string().required('Vui lòng nhập địa chỉ'),
      serviceNumber: Yup.string().min(4, 'Vui lòng nhập hơn 4 kí tự').required('Vui lòng nhập số hợp đồng'),
      paymentAmount: Yup.number().min(4, 'Vui lòng nhập số tiền').required('Vui lòng nhập số tiền'),
      timeForPayment: Yup.date().min(currentDate, 'Nhập thời hạn thanh toán'),
      // timeForPayment: Yup.date().max(new Date().toISOString().slice(0, 10), '???'),
    }),
    onSubmit: async (values) => {
      values.status = statusSelected;
      values.branchId = localStorage.getItem('userID');
      values.isCheckDelete = true;
      values.collectionCatalogId = selectVal;

      if (isUpdate) {
        const respone = await collectionReceiptsApi.update(idItem, values);
      } else {
        const respone = await collectionReceiptsApi.add(values);
      }

      setReload((prev) => !prev);
      dispatch(create());
      formik.resetForm();
    },
  });

  //init values (status or form payments)
  const [status, setStatus] = useState([
    {
      id: 0,
      name: 'processed',
      text: 'Đã xử lí',
      isChecked: true,
    },
    {
      id: 1,
      name: 'peding',
      text: 'Chưa xử lý',
      isChecked: false,
    },
  ]);

  //handle Selected Item (status or formPayments)

  const handleSelectedItem = (index = 0, nameGroup) => {
    if (nameGroup === 'status') {
      const newStatus = [...status];
      setStatus(
        newStatus.map((item, indexItem) => ({
          ...item,
          isChecked: index === indexItem ? true : false,
        }))
      );
      setStatusSelected(index);
    }
  };

  //handleAdd

  const handleAdd = () => {
    dispatch(edit(''));
    dispatch(create());
    formik.resetForm();
    setSelectVal(0);
    handleSelectedItem(0, 'status');
  };

  //handleDelete

  const handleDelete = async (id) => {
    const respone = await collectionReceiptsApi.remove(id);
    setReload((prev) => !prev);

    if (id === idItem) {
      handleAdd();
    }
  };
  //handleEdit

  const handleEdit = async (id, checked) => {
    const respone = await collectionReceiptsApi.update(id, {
      status: checked,
    });
    setReload((prev) => !prev);
  };
  //handleView

  useEffect(() => {
    (async () => {
      try {
        const fillVal = await collectionReceiptsApi.get(idItem);
        console.log('fillVal', fillVal);

        formik.setValues(
          {
            serviceNumber: fillVal.serviceNumber,

            phone: fillVal.phone,
            name: fillVal.name,
            address: fillVal.address,

            // timeForPayment: fillVal.timeForPayment === 0 ? Date().toISOString().subStr(0, 10) : fillVal.timeForPayment,
            timeForPayment: fillVal.timeForPayment,

            paymentAmount: fillVal.paymentAmount,
            paymentAmountText: VNnum2words(fillVal.paymentAmount).trim() + ' đồng',
          },
          true
        );
        const newStatus = [
          {
            id: 0,
            name: 'processed',
            text: 'Đã xử lí',
            isChecked: fillVal.status,
          },
          {
            id: 1,
            name: 'peding',
            text: 'Chưa xử lý',
            isChecked: !fillVal.status,
          },
        ];
        setSelectVal(fillVal.collectionCatalogId);
        handleSelectedItem(fillVal.status, 'status');
      } catch (error) {
        console.log('Failed to fetch api', error);
      }
    })();
  }, [idItem]);

  const handleView = (id) => {
    dispatch(edit(id));
  };

  //scroll top

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [idItem]);

  const handleInputTransferFee = (e, valueTransferAmount, valueTransferFee) => {
    if (valueTransferAmount) {
      const newValue = valueTransferAmount - Number.parseInt(e.target.value);
      formik.setValues(
        {
          paymentAmountText: VNnum2words(newValue),
          paymentAmount: newValue,
        },
        false
      );
    }
  };
  const handleInputPaymentAmount = (e) => {
    // console.log('e.target.value', e.target.value);
  };

  const handleChangeSelect = (value) => {
    setSelectVal(value);
  };
  //call api catalog products

  useEffect(() => {
    (async () => {
      try {
        const respone = await collectionCatalogApi.getAll();
        setCollectionCatalogs(respone);
      } catch (error) {
        console.log('Failed to fetch Api', error);
      }
    })();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12}>
            <div className="main-col__box d-flex justify-content-between">
              <h2 className="main-col__heading">Hóa đơn thu hộ</h2>
              <div className="btn-group">
                <a onClick={handleAdd} className="ms-auto btn-reset bg-yellow color-blue btn btn-md">
                  <i className="fa fa-plus"></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4 className="main-col__title">Thông tin dịch vụ thu hộ</h4>
            <TextField form={formik} name="serviceNumber" icon={'fa-id-badge'} placeholder={'Số hợp đồng'} />
            <SelectField
              form={formik}
              handleChange={handleChangeSelect}
              name="collectionCatalogId"
              icon="fa-folder-open"
              data={collectionCatalogs}
              selectVal={selectVal}
            />
            <TextField
              form={formik}
              type="date"
              name="timeForPayment"
              icon={'fa-calendar'}
              placeholder={'Kì hạn thanh toán'}
            />
          </Col>
          <Col md={6}>
            <h4 className="main-col__title">Thông tin khách nộp tiền</h4>
            <TextField form={formik} type="number" name="phone" icon={'fa-phone'} placeholder={'Nhập điện thoại'} />
            <TextField form={formik} name="name" icon={'fa-user-o'} placeholder={'Họ và tên'} />
            <TextField form={formik} name="address" icon={'fa-map-marker'} placeholder={'Địa chỉ'} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="main-col__title">Thông tin khách gửi</h4>
            <TextField
              type="number"
              form={formik}
              name="paymentAmount"
              icon={'fa-pause'}
              placeholder={'Số tiền thanh toán'}
              customInput={handleInputPaymentAmount}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              readOnly={true}
              form={formik}
              name="paymentAmountText"
              icon={'fa-text-width'}
              placeholder={'Số tiền thanh toán bằng chữ'}
              customInput={handleInputPaymentAmount}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4 className="main-col__title">Trạng thái xử lý</h4>
            <RadioGroup handleChange={handleSelectedItem} nameGroup="status" value={status} />
          </Col>
          <Col md={6}>
            <h4 className="main-col__title">Tác Vụ</h4>
            <div className="d-flex">
              <Button type="submit" variant="md" className="btn-reset bg-yellow color-blue">
                <i className="fa fa-print"></i> {isUpdate ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </Col>
        </Row>
      </form>
      <CollectionBillTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        reLoad={reLoad}
      />
    </>
  );
}
export default CollectionBillForm;
