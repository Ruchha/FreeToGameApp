import  {FC} from 'react';
import { publicRoutes } from '../routes/routes';
import { Routes, Route } from 'react-router-dom';

const AppRouter: FC = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />)}
        </Routes>
);
};

export default AppRouter