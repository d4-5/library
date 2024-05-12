import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const MainLayout = () => {
    const [search, setSearch] = useState("")

    return (
        <>
            <Navbar setSearch={setSearch} />
            <Outlet context={[search, setSearch]} />
        </>
    );
};

export default MainLayout;