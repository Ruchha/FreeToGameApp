import { Layout } from 'antd';
import { FC } from 'react';
import "./App.css"
import Navbar from './components/Navbar';
import GamesList from './components/GamesList';
import AppRouter from './components/AppRouter';




const App: FC = () => {

  return (
    <Layout>
      <Navbar/>
      <AppRouter/>
    </Layout>

);
};

export default App