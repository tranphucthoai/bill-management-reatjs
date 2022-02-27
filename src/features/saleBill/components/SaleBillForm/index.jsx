import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { default as VNnum2words } from 'vn-num2words';
import * as Yup from 'yup';
import saleReceiptsApi from '../../../../api/saleBillApi';
import RadioGroup from '../../../../components/formControls/RadioGroup/index';
import SelectField from '../../../../components/formControls/SelectField';
import TextField from '../../../../components/formControls/TextField/index';
import { create, edit } from '../../salesBillSlice';
import SaleBillTable from '../SaleBillTable/index';
import saleCatalogApi from './../../../../api/saleCatalogApi';
import ToastNormal from './../../../../components/ToastNormal/index';

function SaleBillForm() {
  const [reLoad, setReload] = useState(false);
  const [statusSelected, setStatusSelected] = useState(0);
  const dispatch = useDispatch();
  const { isUpdate, idItem } = useSelector((state) => state.saleBill);
  const [saleCatalogs, setSaleCatalogs] = useState([]);
  const [selectVal, setSelectVal] = useState('CardMobi');
  const [showToast, setShowToast] = useState(false);
  const [fieldToast, setFieldToast] = useState({});

  //init formik
  const initValForm = {
    phone: '',
    name: '',
    address: '',
    productNumber: '',
    quantity: '',
    price: '',
    totalAmountText: '',
    totalAmount: '',
  };

  const formik = useFormik({
    initialValues: initValForm,
    validationSchema: Yup.object({
      phone: Yup.number().min(10, 'Số điện thoại ít nhất 10 chữ số').required('Vui lòng nhập số điện thoại'),
      name: Yup.string().min(5, 'Vui lòng nhập họ và tên').required('Vui lòng nhập họ và tên'),
      address: Yup.string().required('Vui lòng nhập địa chỉ'),
      productNumber: Yup.string().min(4, 'Mã số ít nhất 4 kí tự').required('Vui lòng nhập mã số'),
      quantity: Yup.number()
        .required('Vui lòng nhập số lượng')
        .moreThan(0, 'Số lượng lớn hơn không')
        .integer('Số lượng là số nguyên'),
      price: Yup.number().required('Vui lòng nhập số tiền'),
    }),
    onSubmit: async (values) => {
      values.totalAmount = values.quantity * values.price;
      values.status = statusSelected;
      values.branchId = localStorage.getItem('userID');
      values.isCheckDelete = true;
      values.saleCatalogId = selectVal;

      if (isUpdate) {
        try {
          await saleReceiptsApi.update(idItem, values);
        } catch (error) {
          showToastItem('danger', 'Lỗi Quá Trình Cập Nhật !!!', error);
        }
        showToastItem('success', 'Cập Nhật Thành Công', 'Đã cập nhật thành công một trường');
      } else {
        try {
          await saleReceiptsApi.add(values);
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

  //init value
  const [status, setStatus] = useState([
    {
      id: 0,
      name: 'processed',
      text: 'Đã xử lí',
      isChecked: true,
    },
    {
      id: 1,
      name: 'pending',
      text: 'Chưa xử lý',
      isChecked: false,
    },
  ]);

  //handle Selected Item
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
      await saleReceiptsApi.remove(id);
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
      await saleReceiptsApi.update(id, {
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
          const fillVal = await saleReceiptsApi.get(idItem);
          formik.setValues(
            {
              phone: fillVal.phone,
              name: fillVal.name,
              address: fillVal.address,

              productNumber: fillVal.productNumber,
              quantity: fillVal.quantity,
              price: fillVal.price,

              totalAmount: fillVal.totalAmount,
              totalAmountText: VNnum2words(fillVal.totalAmount).trim() + ' đồng',
            },
            true
          );
          setSelectVal(fillVal.saleCatalogId);
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
    setSelectVal(saleCatalogs[0].id);

    handleSelectedItem(0, 'status');
  };

  //scroll top
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [idItem]);

  const calcTotalAmount = () => {
    const totalAmount = formik.values['price'] * formik.values['quantity'];
    const price = formik.values['price'];
    const quantity = formik.values['quantity'];
    if (price >= 0 && quantity >= 0) {
      formik.setValues(
        (prev) => ({
          ...prev,
          totalAmount: totalAmount >= 0 ? totalAmount : '',
          totalAmountText: totalAmount >= 0 ? VNnum2words(totalAmount).trim() + ' đồng' : '',
        }),
        false
      );
    }
  };

  const handleChangeSelect = (value) => {
    setSelectVal(value);
  };

  //call api catalog products
  useEffect(() => {
    (async () => {
      try {
        const respone = await saleCatalogApi.getAll();
        setSaleCatalogs(respone);
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
              <h2 className="main-col__heading">Hóa đơn bán hàng</h2>
              <div className="btn-group">
                <div onClick={handleAdd} className="ms-auto btn-reset bg-yellow color-blue btn btn-md">
                  <i className="fa fa-plus"></i>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4 className="main-col__title">Thông tin khách gửi</h4>
            <TextField form={formik} type="number" name="phone" icon={'fa-phone'} placeholder={'Nhập điện thoại'} />
            <TextField form={formik} name="name" icon={'fa-user-o'} placeholder={'Họ và tên'} />
            <TextField form={formik} name="address" icon={'fa-map-marker'} placeholder={'Địa chỉ'} />
          </Col>
          <Col md={6}>
            <h4 className="main-col__title">Thông tin sản phẩm</h4>
            <SelectField
              form={formik}
              handleChange={handleChangeSelect}
              name="selectUser"
              icon="fa-folder-open"
              data={saleCatalogs}
              selectVal={selectVal}
            />
            <TextField form={formik} name="productNumber" icon={'fa-barcode'} placeholder={'Mã số sản phẩm (nếu có)'} />
            <Row>
              <Col md={6}>
                <TextField
                  form={formik}
                  name="quantity"
                  icon={'fa-calculator'}
                  placeholder={'Số lượng'}
                  type="number"
                  customInput={calcTotalAmount}
                />
              </Col>
              <Col md={6}>
                <TextField
                  form={formik}
                  name="price"
                  type="number"
                  icon={'fa-money'}
                  placeholder={'Đơn giá'}
                  customInput={calcTotalAmount}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="main-col__title">Thông tin khách gửi</h4>
            <TextField
              readOnly={true}
              type="number"
              form={formik}
              name="totalAmount"
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
      <SaleBillTable handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} reLoad={reLoad} />
      <ToastNormal fieldToast={fieldToast} showToast={showToast} hideToast={handleHideToast} />
    </>
  );
}

export default SaleBillForm;
