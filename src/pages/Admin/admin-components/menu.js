import React from 'react';
import { Menu } from 'antd';
import {
  Link,
  useHistory
} from "react-router-dom";
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { adminSignout } from '../../../authentication';
import "../../../scss/admin.scss";

const { SubMenu } = Menu;

const AdminMenu = () => {
  let history = useHistory();
  const signout = () => {
    // adminSignout();
    // window.location.reload();
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      // console.log("removed")
      window.location.reload();
  }
    history.push(`/signin`)
    window.location.reload();
  }
  return (
    <Menu theme="dark" mode="inline">
      <SubMenu  key="sub1" icon={<UserOutlined />} title="Client">
      <Menu.Item key="3">
        Registered/Enable Clients
          <Link to="/admin/dashboard" />
        </Menu.Item>
        <Menu.Item key="2">
          Disable Clients
          <Link to="/admin/dashboard/disableclient" />
        </Menu.Item>
        <Menu.Item key="1">
        Create Account
          <Link to="/admin/dashboard/addnewclient" />
        </Menu.Item>
       
       

      </SubMenu>
      <Menu.Item onClick={signout} key="4" icon={<PieChartOutlined />}>
        Signout
      </Menu.Item>
    </Menu>
  );
}

export default AdminMenu;