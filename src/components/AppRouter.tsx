import { FC } from 'react';
import { routes } from '../routes/routes';
import { Routes, Route } from 'react-router-dom';

const AppRouter: FC = () => {
    return (
        <Routes>
            {routes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />)}
        </Routes>
    );
};

export default AppRouter