import { Button, Result } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Такой игры нет!"
            extra={
                <Button type="primary">
                    <Link to="/">На главную страницу</Link>
                </Button>
            }
        />

    );
};

export default NotFound