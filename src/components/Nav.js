import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logo from '../images/Logo A1 White.png';

const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Menu"
        placement="left"
        className="drawer"
        // onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>
      <a href="/">
      <img src={logo} style={{float: "right", marginRight: 10}} height="40px" width="80px" alt="logo" />
      </a>
    </nav>
  );
};

export default NavBar;