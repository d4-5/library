import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    const [search, setSearch] = useState("")

    return (
        <>
            <Navbar setSearch={setSearch} />
            <Outlet context={[search, setSearch]} />
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
        </>
    );
};

export default MainLayout;