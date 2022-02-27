import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { default as VNnum2words } from 'vn-num2words';
import * as Yup from 'yup';
import receiveBillApi from '../../../../api/receiveBillApi';
import RadioGroup from '../../../../components/formControls/RadioGroup/index';
import SelectField from '../../../../components/formControls/SelectField';
import TextField from '../../../../components/formControls/TextField/index';
import { create, edit } from '../../receiveBillSlice';
import ReceiveBillTable from './../ReceiveBillTable/index';
import banksApi from './../../../../api/banksApi';
import ToastNormal from '../../../../components/ToastNormal';

function ReceiveBillForm() {
  const [reLoad, setReload] = useState(false);
  const [statusSelected, setStatusSelected] = useState(0);
  const [paymentsSelected, setPaymentsSelected] = useState(0);
  const dispatch = useDispatch();
  const { isUpdate, idItem } = useSelector((state) => state.receiveBill);
  const [selectVal, setSelectVal] = useState('');
  const [banks, setbank] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [fieldToast, setFieldToast] = useState({});

  //init formik

  const initValForm = {
    senderPhone: '',
    senderName: '',
    senderCardId: '',
    senderAddress: '',
    receiverPhone: '',
    receiverName: '',
    receiverCardId: '',
    receiverAddress: '',
    secretNumber: '',
    subTotal: '',
    fees: '',
    grandTotal: '',
    grandTotalText: '',
  };

  const formik = useFormik({
    initialValues: initValForm,
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

      subTotal: Yup.number().min(4, 'Vui lòng nhập số tiền').required('Vui lòng nhập số tiền'),
      fees: Yup.number().required('Vui lòng nhập lệ phí'),
      secretNumber: Yup.number().required('Vui lòng nhập mã số bí mật'),
    }),
    onSubmit: async (values) => {
      values.status = statusSelected;
      values.branchId = localStorage.getItem('userID');
      values.isCheckDelete = true;
      values.bankId = selectVal;
      values.formOfReceipt = paymentsSelected;

      values.grandTotal = values.subTotal - values.fees;
      values.isCheckDelete = true;
      values.createdBy = '';
      values.senderCardIdDateOfIssue = 0;
      values.senderCardIdPlaceOfIssue = values.senderAddress;
      values.receiverCardIdDateOfIssue = 0;
      values.receiverCardIdPlaceOfIssue = values.receiverAddress;

      values.banks = selectVal;

      if (isUpdate) {
        try {
          await receiveBillApi.update(idItem, values);
        } catch (error) {
          showToastItem('danger', 'Lỗi Quá Trình Cập Nhật !!!', error);
        }
        showToastItem('success', 'Cập Nhật Thành Công', 'Đã cập nhật thành công một trường');
      } else {
        try {
          await receiveBillApi.add(values);
        } catch (error) {
          showToastItem('danger', 'Lỗi Quá Trình Thêm Mới !!!', error);
        }
        showToastItem('success', 'Thêm Thành Công', 'Đã thêm mới thành công một trường');
      }
      setReload((prev) => !prev);
      dispatch(create());
      resetForm();
    },
  });

  //init values status
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

  //init values form payments

  const [formOfReceipt, setFormOfReceipt] = useState([
    {
      id: 0,
      name: 'home',
      text: 'Tại nhà',
      isChecked: true,
    },
    {
      id: 1,
      name: 'office',
      text: 'Văn phòng',
      isChecked: false,
    },
    {
      id: 2,
      name: 'banking',
      text: 'Chuyển khoản',
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
    if (nameGroup === 'formPayments') {
      const newFormOfReceipt = [...formOfReceipt];
      setFormOfReceipt(
        newFormOfReceipt.map((item = 0, indexItem) => ({
          ...item,
          isChecked: index === indexItem ? true : false,
        }))
      );
      setPaymentsSelected(index);
    }
  };

  //handleAdd

  const handleAdd = () => {
    dispatch(create());
    resetForm();
  };

  //handleDelete

  const handleDelete = async (id) => {
    try {
      await receiveBillApi.remove(id);
    } catch (error) {
      showToastItem('danger', 'Lỗi Quá Trình Xoá !!!', error);
    }
    showToastItem('success', 'Xoá Thành Công', 'Đã xoá thành công một trường');

    setReload((prev) => !prev);

    if (id === idItem) {
      handleAdd();
    }
  };

  //handleEdit

  const handleEdit = async (id, checked) => {
    try {
      await receiveBillApi.update(id, {
        status: checked,
      });
    } catch (error) {
      showToastItem('danger', 'Lỗi Quá Trình Cập Nhật !!!', error);
    }
    showToastItem('success', 'Cập Nhật Thành Công', 'Đã cập nhật thành công trạng thái một trường');
    setReload((prev) => !prev);
  };
  //handleView

  useEffect(() => {
    if (idItem) {
      (async () => {
        try {
          const fillVal = await receiveBillApi.get(idItem);
          formik.setValues(
            {
              senderPhone: fillVal.senderPhone,
              senderName: fillVal.senderName,
              senderCardId: fillVal.senderCardId,
              senderAddress: fillVal.senderAddress,
              receiverPhone: fillVal.receiverPhone,
              receiverName: fillVal.receiverName,
              receiverCardId: fillVal.receiverCardId,
              receiverAddress: fillVal.receiverAddress,
              bankPlusPhone: fillVal.bankPlusPhone,
              subTotal: fillVal.subTotal,
              fees: fillVal.fees,
              accountNumber: fillVal.accountNumber,
              grandTotal: fillVal.grandTotal,
              secretNumber: fillVal.secretNumber,
              grandTotalText: VNnum2words(fillVal.grandTotal).trim() + ' đồng',
            },
            true
          );
          setSelectVal(fillVal.bankId);
          handleSelectedItem(fillVal.status, 'status');
          handleSelectedItem(fillVal.formOfReceipt, 'formPayments');
        } catch (error) {
          console.log('Failed to fetch api', error);
        }
      })();
    }
  }, [idItem]);

  const handleView = (id) => {
    dispatch(edit(''));
    dispatch(edit(id));
  };

  const calcGrandTotal = () => {
    const subTotal = formik.values['subTotal'];
    const fees = formik.values['fees'];
    const grandTotal = subTotal - fees;
    if (fees >= 0 && subTotal >= 0) {
      formik.setValues(
        (prev) => ({
          ...prev,
          grandTotal: grandTotal >= 0 ? grandTotal : 0,
          grandTotalText: grandTotal >= 0 ? VNnum2words(grandTotal).trim() + ' đồng' : 0,
        }),
        false
      );
    }
  };

  //reset form
  const resetForm = () => {
    formik.resetForm();
    setSelectVal(banks[0].id);
    handleSelectedItem(0, 'status');
    handleSelectedItem(0, 'formPayments');
  };

  //scroll top
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [idItem]);

  const handleChangeSelect = (value) => {
    setSelectVal(value);
  };

  //call banks

  useEffect(() => {
    (async () => {
      try {
        const respone = await banksApi.getAll();
        setbank(respone);
      } catch (error) {
        console.log('Failed to fetch Api', error);
      }
    })();
  }, []);

  //show hide toast
  const showToastItem = (type, title, massage) => {
    setShowToast(true);
    setFieldToast({
      type,
      title,
      massage,
    });
  };
  const handleHideToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12}>
            <div className="main-col__box d-flex justify-content-between">
              <h2 className="main-col__heading">Hóa đơn nhận tiền</h2>
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
            <h4 className="main-col__title">Thông tin khách gửi</h4>
            <TextField
              form={formik}
              type="number"
              name="senderPhone"
              icon={'fa-phone'}
              placeholder={'Nhập điện thoại'}
            />
            <TextField form={formik} name="senderName" icon={'fa-user-o'} placeholder={'Họ và tên'} />
            <TextField
              type="number"
              form={formik}
              name="senderCardId"
              icon={'fa-id-card-o'}
              placeholder={'Số CMND / Hộ chiếu'}
            />
            <TextField form={formik} name="senderAddress" icon={'fa-map-marker'} placeholder={'Địa chỉ'} />
          </Col>
          <Col md={6}>
            <h4 className="main-col__title">Thông tin khách nhận</h4>
            <TextField
              type="number"
              form={formik}
              name="receiverPhone"
              icon={'fa-phone'}
              placeholder={'Nhập điện thoại'}
            />
            <TextField form={formik} name="receiverName" icon={'fa-user-o'} placeholder={'Họ và tên'} />
            <TextField
              type="number"
              form={formik}
              name="receiverCardId"
              icon={'fa-id-card-o'}
              placeholder={'Số CMND / Hộ chiếu'}
            />
            <TextField form={formik} name="receiverAddress" icon={'fa-map-marker'} placeholder={'Địa chỉ'} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="main-col__title">Thông tin khách gửi</h4>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                    <SelectField
                      form={formik}
                      handleChange={handleChangeSelect}
                      name="banks"
                      icon="fa-folder-open"
                      data={banks}
                      selectVal={selectVal}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField form={formik} name="secretNumber" icon={'fa fa-key'} placeholder={'Mã số bí mật'} />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                    <TextField
                      type="number"
                      form={formik}
                      name="subTotal"
                      icon={'fa fa-usd'}
                      placeholder={'Số tiền nhận'}
                      customInput={calcGrandTotal}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      type="number"
                      form={formik}
                      name="fees"
                      icon={'fa fa-plus'}
                      placeholder={'Lệ phí'}
                      customInput={calcGrandTotal}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <TextField
              readOnly={true}
              type="number"
              form={formik}
              name="grandTotal"
              icon={'fa-pause'}
              placeholder={'Số tiền thanh toán'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              readOnly={true}
              form={formik}
              name="grandTotalText"
              icon={'fa-text-width'}
              placeholder={'Số tiền thanh toán bằng chữ'}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4 className="main-col__title">Hình thức nhận tiền</h4>
            <RadioGroup nameGroup="formPayments" handleChange={handleSelectedItem} value={formOfReceipt} />
          </Col>
          <Col md={6}>
            <h4 className="main-col__title">Trạng thái xử lý</h4>
            <div className="d-flex">
              <RadioGroup handleChange={handleSelectedItem} nameGroup="status" value={status} />
              <Button type="submit" variant="md" className="ms-5 btn-reset bg-yellow color-blue">
                <i className="fa fa-print"></i> {isUpdate ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </Col>
        </Row>
      </form>
      <ReceiveBillTable handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} reLoad={reLoad} />
      <ToastNormal fieldToast={fieldToast} showToast={showToast} hideToast={handleHideToast} />
    </>
  );
}

export default ReceiveBillForm;
