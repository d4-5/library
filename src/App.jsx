import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import { getBookRequest } from './api';

const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/add-book' element={<AddBookPage />} />
                <Route
                    path='/edit-book/:id'
                    element={<EditBookPage />}
                    loader={getBookRequest}
                />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};
export default App;