import React from 'react';
import { Layout } from 'antd';
import {
  Logo
} from './assets/index';
import styled from 'styled-components';
import CategoryPage from './pages/CategoryPage'

const { Header, Footer } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 100,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#ffffff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#000',
};

const Content = styled.div`
    width: 100%;
    margin: 0 ;
    display: 'flex';
    color:black;
`;

const App = () => {

  return (
    <Layout style={{ width: '100%' }}>
      <Header style={headerStyle}><img src={Logo} style={{ width: '25%' }} alt='Gymbeam logo' /></Header>
      <Content><CategoryPage /></Content>
      <Footer style={footerStyle}>Gymbeam 2023</Footer>
    </Layout>
  );
}

export default App;
