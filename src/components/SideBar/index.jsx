import React from 'react';
import './style.scss';
import { Dropdown, Button } from 'react-bootstrap';

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <h3 className="sidebar__heading mb-4">
          CÔNG TY TNHH DV VT TRƯỜNG THỌ
          <br />
          BƯU ĐIỆN - VIETTEL TRƯỜNG THỌ
        </h3>

        <Dropdown className="sidebar__dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-reset">
            Chọn loại hoá đơn
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Hoá Đơn Bán Hàng</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Hoá Đơn Chuyển Tiền</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Hoá Đơn Nhận Tiền</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Hoá Đơn Thu Hộ</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <p className="sidebar__thumb mb-4 mt-4">
          <img src="https://via.placeholder.com/300.png" alt="" />
        </p>

        <ul className="sidebar__info">
          <li>
            <i className="fa fa-map-marker"></i>
            <p>
              QL14 Ngã 3 Phú Hòa, KP Phú Hòa
              <br />
              P.Hòa Lợi, H.Bến Cát, T.Bình Dương
            </p>
          </li>
          <li>
            <i className="fa fa-phone"></i>
            <p>Số điện thoại: 02746.222.999</p>
          </li>
          <li>
            <i className="fa fa-mobile"></i>
            <p>Hotline: 0977.87.78.77</p>
          </li>
          <li>
            <i className="fa fa-user-circle"></i>
            <p>Tư vấn viên: Lê Văn Trường</p>
          </li>
          <li>
            <i className="fa fa-globe"></i>
            <p>Website: http://hoadonbanhang.com</p>
          </li>
        </ul>

        <div className="sidebar__action mt-4">
          <Button className="mb-3" variant="danger">
            Thoát Tài Khoản
          </Button>
          <ul>
            <li>
              <a href="">Về Trang Chủ</a>
            </li>
            <li>|</li>
            <li>
              <a href="">Đổi Mật Khẩu</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
