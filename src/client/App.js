import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import AdminPage from './AdminPage';
import PlayerPage from './PlayerPage';
import Board from './Board';
import Home from './Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/board', // Game board
        element: <Board />,
    },
    {
        path: '/team1', // Game board
        element: <PlayerPage id={1} />,
    },
    {
        path: '/team2', // Game board
        element: <PlayerPage id={2} />,
    },
    {
        path: '/team3', // Game board
        element: <PlayerPage id={3} />,
    },
    {
        path: '/admin', // Game board
        element: <AdminPage />,
    },
]);

export const App = () => {
    return <RouterProvider router={router}/>;
};

export default App;