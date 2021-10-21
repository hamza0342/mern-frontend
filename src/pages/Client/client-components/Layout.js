import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  Link,
} from "react-router-dom";

import BreadCrumbs from "../../../components/breadcrumbs";
import { clientSignout, isAuthenticated } from "../../../authentication/index";
import '../../../scss/client.scss';

const { Header, Content, Footer } = Layout;

// let id = localStorage.getItem("keys")
const MainLayout = ({ component }) => {
  var str = isAuthenticated().client.name;
  var result = str.substring(0, 1);
  
  const signout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    
    <Link to="/client/signin"></Link>

    window.location.reload();
  }

  //Extracting first letter of name 
  


  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item key="0">
        <Link to="/client/profile">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={signout}>
        Signout
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout className="layout" >
      <Header className="header-style" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Menu theme="dark" mode="horizontal" className="header-style">
        
          {localStorage.removeItem("keys")}
      
          {

            isAuthenticated() && (
              <Menu.Item key="1">

                <a>
                  <Link to={`/client/dashboard`}>
                    {str}
             
                  </Link>

                </a>
                's Account
              </Menu.Item>
            )
          }
          {/* {
            localStorage.getItem("keys")
          } */}
          <Dropdown overlay={menu} placement={"bottomCenter"} >
            <Avatar
              className="avatar-props"
              onClick={e => e.preventDefault()}
              size={30}
              style={{ marginLeft: 10 }}
            >
              {result}
            </Avatar>
          </Dropdown>
          {/* <Menu.Item key="2" style={{float: "Right"}} onClick={signout}>
                Signout
              </Menu.Item> */}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', backgroundColor: "#FFFFFF", minHeight: "50vw" }}>
        {component}
      </Content>
      <Footer style={{ textAlign: 'center' }}>ArchiWiz &copy; 2021 A Project of Safe Solutions Consultants</Footer>
    </Layout>

  )
}

export default MainLayout;