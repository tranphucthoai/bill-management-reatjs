import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Offcanvas, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/login/loginSlice';
import branchsApi from './../../api/branchsApi';
import { hide } from './menuMoblieSlice';

MenuMobile.propTypes = {};

function MenuMobile(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* */
  const { userName } = useSelector((state) => state.loginUser);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const respone = await branchsApi.get(userName);
        setUser(respone);
      } catch (error) {}
    })();
  }, [userName]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem('userName', '');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="sidebar offcanvas-menu">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body className="sidebar-inner">
          <h3 className="sidebar__heading mb-4">{user.name}</h3>
          <Dropdown className="sidebar__dropdown dropdown-normal" autoClose={true}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-reset">
              Chọn loại hoá đơn
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/saleBill">
                Hoá Đơn Bán Hàng
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/transferBill">
                Hoá Đơn Chuyển Tiền
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/collectionBill">
                Hoá Đơn Nhận Tiền
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/receiveBill">
                Hoá Đơn Thu Hộ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {userName.length > 0 && (
            <ul className="sidebar__info">
              <li>
                <i className="fa fa-map-marker"></i>
                <p>{user.address}</p>
              </li>
              <li>
                <i className="fa fa-phone"></i>
                <p>Số điện thoại: {user.phone}</p>
              </li>
              <li>
                <i className="fa fa-mobile"></i>
                <p>Hotline: {user.hotline}</p>
              </li>
              <li>
                <i className="fa fa-user-circle"></i>
                <p>Tư vấn viên: {user.consultantName}</p>
              </li>
              <li>
                <i className="fa fa-globe"></i>
                <p>
                  Website: <a href={user.website}>{user.website}</a>
                </p>
              </li>
            </ul>
          )}

          <div className="sidebar__action mt-4">
            <Button
              onClick={userName ? handleLogout : handleLogin}
              className="mb-3"
              variant={userName ? 'danger' : 'success'}
            >
              {userName ? 'Thoát Tài Khoản' : 'Đăng Nhập'}
            </Button>
            {userName.length > 0 && (
              <ul>
                <li>
                  <Link to="/home">Về Trang Chủ</Link>
                </li>
                <li>|</li>
                <li>
                  <Link to="/home">Đổi Mật Khẩu</Link>
                </li>
              </ul>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MenuMobile;
