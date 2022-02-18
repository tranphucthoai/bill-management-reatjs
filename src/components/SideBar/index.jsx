import React, { useEffect, useState } from 'react';
import './style.scss';
import { Dropdown, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import branchsApi from './../../api/branchsApi';
import { logout } from '../../features/login/loginSlice';
import { useNavigate, Link } from 'react-router-dom';

function SideBar() {
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
    <aside className="sidebar">
      <div className="sidebar-inner">
        <h3 className="sidebar__heading mb-4">{user.name}</h3>
        <Dropdown className="sidebar__dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-reset">
            Chọn loại hoá đơn
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="saleBill">Hoá Đơn Bán Hàng</Dropdown.Item>
            <Dropdown.Item href="transferBill">Hoá Đơn Chuyển Tiền</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Hoá Đơn Nhận Tiền</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Hoá Đơn Thu Hộ</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <p className="sidebar__thumb mb-4 mt-4">
          <img src={userName ? user.thumb : 'https://via.placeholder.com/300.png'} alt="" />
        </p>

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
                <Link to={'/home'}>Về Trang Chủ</Link>
              </li>
              <li>|</li>
              <li>
                <Link href="">Đổi Mật Khẩu</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
