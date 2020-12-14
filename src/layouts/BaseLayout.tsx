import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const BaseLayout: React.FC = ({ children }) => (
  <Layout>
    <Header>
      <h1 className="title">ToDo List</h1>
    </Header>
    <Content>
      {children}
    </Content>
  </Layout>
);

export default BaseLayout;
