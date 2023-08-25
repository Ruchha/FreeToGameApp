import Game from "../pages/Game";
import Home from "../pages/Home";

export interface IRoute {
    path: string;
    Component: React.ComponentType;
}

export const publicRoutes = [
    {
        path:"/",
        Component:Home
    },
    {
        path:"/:id",
        Component:Game
    }
]