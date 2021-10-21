import React from "react";
import { Layout } from "antd";
import logo from '../images/Logo A1 White.png';
const SideBar = ({ menu }) => {
  return (  
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="dark"
      collapsedWidth={0}
      trigger={null}
    >
    <div className="logo">
        <img src={logo} height="80px" width="150px" alt="logo" />
    </div>
        {menu}
    </Layout.Sider>
  );
};

export default SideBar;