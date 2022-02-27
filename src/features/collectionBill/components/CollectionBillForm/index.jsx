import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { default as VNnum2words } from 'vn-num2words';
import * as Yup from 'yup';
import collectionBillApi from '../../../../api/collectionBillApi';
import RadioGroup from '../../../../components/formControls/RadioGroup/index';
import SelectField from '../../../../components/formControls/SelectField';
import TextField from '../../../../components/formControls/TextField/index';
import ToastNormal from '../../../../components/ToastNormal';
import { create, edit } from '../../collectionBillSlice';
import collectionCatalogApi from './../../../../api/collectionCatalogApi';
import CollectionBillTable from './../collectionBillTable/index';

function CollectionBillForm() {
  const [reLoad, setReload] = useState(false);
  const [statusSelected, setStatusSelected] = useState(0);
  const dispatch = useDispatch();
  const { isUpdate, idItem } = useSelector((state) => state.collectionBill);
  const [collectionCatalogs, setCollectionCatalogs] = useState([]);
  const [selectVal, setSelectVal] = useState('');
  const [fieldToast, setFieldToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  //init formik
  const initValForm = {
    phone: '',
    name: '',
    address: '',
    price: '',
    serviceNumber: '',
    timeForPayment: 0,
    totalAmount: '',
    totalAmountText: '',
  };

  const formik = useFormik({
    initialValues: initValForm,
    validationSchema: Yup.object({
      phone: Yup.number().min(10, 'Số điện thoại ít nhất 10 chữ số').required('Vui lòng nhập số điện thoại'),
      name: Yup.string().min(5, 'Vui lòng nhập họ và tên').required('Vui lòng nhập họ và tên'),
      address: Yup.string().required('Vui lòng nhập địa chỉ'),
      serviceNumber: Yup.string().min(4, 'Vui lòng nhập hơn 4 kí tự').required('Vui lòng nhập số hợp đồng'),
      totalAmount: Yup.number().min(4, 'Vui lòng nhập số tiền').required('Vui lòng nhập số tiền'),
      timeForPayment: Yup.date().min(1, 'Vui lòng nhập thời gian'),
    }),
    onSubmit: async (values) => {
      values.status = statusSelected;
      values.branchId = localStorage.getItem('userID');
      values.isCheckDelete = true;
      values.collectionCatalogId = selectVal;

      if (isUpdate) {
        try {
          await collectionBillApi.update(idItem, values);
        } catch (error) {
          showToastItem('danger', 'Lỗi Quá Trình Cập Nhật !!!', error);
        }
        showToastItem('success', 'Cập Nhật Thành Công', 'Đã cập nhật thành công một trường');
      } else {
        try {
          await collectionBillApi.add(values);
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
    resetForm();
  };

  //handleDelete
  const handleDelete = async (id) => {
    try {
      await collectionBillApi.remove(id);
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
      await collectionBillApi.update(id, {
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
          const fillVal = await collectionBillApi.get(idItem);
          formik.setValues(
            {
              serviceNumber: fillVal.serviceNumber,
              phone: fillVal.phone,
              name: fillVal.name,
              address: fillVal.address,
              timeForPayment: fillVal.timeForPayment,
              totalAmount: fillVal.totalAmount,
              totalAmountText: VNnum2words(fillVal.totalAmount).trim() + ' đồng',
            },
            true
          );
          setSelectVal(fillVal.collectionCatalogId);
          handleSelectedItem(fillVal.status, 'status');
        } catch (error) {
          console.log('Failed to fetch api', error);
        }
      })();
    }
  }, [idItem]);

  const handleView = (id) => {
    dispatch(edit(id));
  };

  //reset form
  const resetForm = () => {
    formik.resetForm();
    setSelectVal(collectionCatalogs[0].id);
    handleSelectedItem(0, 'status');
  };

  //scroll top
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [idItem]);

  const convertTotalAmount = () => {
    const totalAmount = formik.values['totalAmount'];
    formik.setValues(
      (prev) => ({
        ...prev,
        totalAmountText: totalAmount >= 0 ? VNnum2words(totalAmount).trim() + ' đồng' : '',
      }),
      false
    );
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
              name="totalAmount"
              icon={'fa-pause'}
              placeholder={'Số tiền thanh toán'}
              customInput={convertTotalAmount}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              readOnly={true}
              form={formik}
              name="totalAmountText"
              icon={'fa-text-width'}
              placeholder={'Số tiền thanh toán bằng chữ'}
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
      <ToastNormal fieldToast={fieldToast} showToast={showToast} hideToast={handleHideToast} />
    </>
  );
}
export default CollectionBillForm;
