import React, { useState } from 'react';
import Sidebar from './SideBar';
import Topbar from './TopBar';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import { SIDEBAR_MENU_OPTIONS } from '../components/constants/sidebar.constants';


function Layout() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} sidebarItems={SIDEBAR_MENU_OPTIONS} />
      <div className="flex-1">
        {/* <Topbar /> */}
        <main className='main-content bg-[#F5F6FA]'>
          <Outlet /> {/* Nested routes will render here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
