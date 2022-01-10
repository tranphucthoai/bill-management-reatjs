import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { default as VNnum2words } from 'vn-num2words';
import * as Yup from 'yup';
import { number } from 'yup/lib/locale';
import transferReceiptsApi from '../../../../api/transferReceiptsApi';
import { create, edit } from '../../transfersBillSlice';
import RadioGroup from './../../../../components/formControls/RadioGroup/index';
import TextField from './../../../../components/formControls/TextField/index';
import BillTable from './../billTable/index';

function BillForm() {
  const [reLoad, setReload] = useState(false);
  const [paymentsSelected, setPaymentsSelected] = useState(0);
  const [statusSelected, setStatusSelected] = useState(0);
  const dispatch = useDispatch();
  const { isUpdate, idItem } = useSelector((state) => state.transfersBill);

  //call api load data table

  useEffect(() => {
    (async () => {
      try {
        const respone = await transferReceiptsApi.get('ok');
      } catch (error) {
        console.log('Failed to fetch Api', error);
      }
    })();
  }, []);

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
    bankPlusPhone: '',
    transferAmount: '',
    transferFee: '',
    accountNumber: '',
    paymentAmount: '',
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

      bankPlusPhone: Yup.number().min(10, 'Số điện thoại ít nhất 10 chữ số').required('Vui lòng nhập số điện thoại'),
      transferAmount: Yup.number().min(4, 'Vui lòng nhập số tiền').required('Vui lòng nhập số tiền'),
      transferFee: Yup.number().required('Vui lòng nhập lệ phí'),
      accountNumber: Yup.number()
        .min(10, 'Vui lòng nhập Số tài khoản / Số thẻ')
        .required('Vui lòng nhập Số tài khoản / Số thẻ'),
    }),
    onSubmit: async (values) => {
      // values.paymentAmount = values.transferAmount - values.transferFee;
      values.formOfReceipt = paymentsSelected;
      values.status = statusSelected;
      values.branchId = localStorage.getItem('userID');
      values.isCheckDelete = true;
      values.createdBy = '';
      values.senderCardIdDateOfIssue = 0;
      values.senderCardIdPlaceOfIssue = values.senderAddress;
      values.receiverCardIdDateOfIssue = 0;
      values.receiverCardIdPlaceOfIssue = values.receiverAddress;
      if (isUpdate) {
        const respone = await transferReceiptsApi.update(idItem, values);
      } else {
        const respone = await transferReceiptsApi.add(values);
      }
      setReload((prev) => !prev);
      dispatch(create());
      formik.resetForm();
    },
  });

  //init values (status or form payments)

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
    formik.resetForm();
  };

  //handleDelete

  const handleDelete = async (id) => {
    const respone = await transferReceiptsApi.remove(id);
    setReload((prev) => !prev);

    if (id === idItem) {
      handleAdd();
    }
  };
  //handleEdit

  const handleEdit = async (id, checked) => {
    const respone = await transferReceiptsApi.update(id, {
      status: checked,
    });
    setReload((prev) => !prev);
  };

  //handleView

  useEffect(() => {
    (async () => {
      try {
        const fillVal = await transferReceiptsApi.get(idItem);

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
            transferAmount: fillVal.transferAmount,
            transferFee: fillVal.transferFee,
            accountNumber: fillVal.accountNumber,
            paymentAmount: fillVal.paymentAmount,
            paymentAmountText: VNnum2words(fillVal.paymentAmount),
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

        handleSelectedItem(fillVal.status, 'status');
        handleSelectedItem(fillVal.formOfReceipt, 'formPayments');
      } catch (error) {
        console.log('Failed to fetch api', error);
      }
    })();
  }, [idItem]);

  const handleView = (id) => {
    dispatch(edit(''));
    dispatch(edit(id));
  };

  //scroll top

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [idItem]);

  // const handleInputTransferAmount = (e, valueTransferAmount, valueTransferFee) => {
  //   if (valueTransferFee) {
  //     const newValue = Number.parseInt(e.target.value) - valueTransferFee;
  //     formik.setValues(
  //       {
  //         paymentAmountText: VNnum2words(newValue),
  //         paymentAmount: newValue,
  //       },
  //       false
  //     );
  //   }
  // };
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
    console.log('e.target.value', e.target.value);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12}>
            <div className="main-col__box d-flex justify-content-between">
              <h2 className="main-col__heading">Hóa đơn chuyển tiền</h2>
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
            <h4 className="main-col__title">Thông tin khách gửi</h4>
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
          <Col md={6}>
            <h4 className="main-col__title">Thông tin gửi tiền</h4>
            <TextField
              type="number"
              form={formik}
              name="accountNumber"
              icon={'fa-credit-card-alt'}
              placeholder={'Số tài khoản / Số thẻ'}
            />
            <Row>
              <Col md={6}>
                <TextField
                  type="number"
                  form={formik}
                  name="transferAmount"
                  icon={'fa-money'}
                  placeholder={'Số tiền muốn chuyển'}
                  // customInput={handleInputTransferAmount}
                />
              </Col>
              <Col md={6}>
                <TextField
                  type="number"
                  form={formik}
                  name="transferFee"
                  icon={'fa-plus'}
                  placeholder={'Lệ phí'}
                  customInput={handleInputTransferFee}
                />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h4 className="main-col__title">Thông tin khách gửi</h4>
            <TextField
              type="number"
              form={formik}
              name="bankPlusPhone"
              icon={'fa-plus'}
              placeholder={'Số điện thoại bank plus'}
            />
            <TextField
              readOnly={true}
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
      <BillTable handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} reLoad={reLoad} />
    </>
  );
}

export default BillForm;
