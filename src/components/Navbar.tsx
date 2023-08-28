import { FC } from 'react';
import { Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';


const Navbar: FC = () => {
    return (
        <Layout.Header style={{ backgroundColor: "black" }}>
            <Typography.Title level={3} style={{ color: 'white', lineHeight: '64px' }}>
                <Link to="/" style={{ color: "inherit" }}>
                    FreeToGame.app
                </Link>
            </Typography.Title>

        </Layout.Header>
    );
};

export default Navbar