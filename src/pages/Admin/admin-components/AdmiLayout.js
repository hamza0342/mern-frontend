import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  Link,
} from "react-router-dom";

import BreadCrumbs from "../../../components/breadcrumbs";
import { clientSignout, isAuthenticated } from "../../../authentication/index";
import '../../../scss/client.scss';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ component }) => {

  return (
    <Layout className="layout" >
      <Header className="header-style" style={{ paddingLeft: 30, paddingRight: 30 }}>
       
      </Header>
      <Content style={{ padding: '0 50px', backgroundColor: "#FFFFFF", minHeight: "40vw" }}>
        {component}
      </Content>
      <Footer style={{ textAlign: 'center' }}>ArchiWiz &copy; 2021 A Project of Safe Solutions Consultants</Footer>
    </Layout>

  )
}

export default MainLayout;