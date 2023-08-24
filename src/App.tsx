import { Layout } from 'antd';
import { FC } from 'react';
import "./App.css"
import Navbar from './components/Navbar';

const App: FC = () => {
  return (
    <Layout>
      <Navbar/>
      <Layout.Content>
      content
      </Layout.Content>
    </Layout>

);
};

export default App