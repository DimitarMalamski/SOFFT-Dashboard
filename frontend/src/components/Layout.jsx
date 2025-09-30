import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr] grid-cols-[260px_1fr] bg-emerald-950 text-state-100'>
      <div className='col-span-2'>
        <Header title='OVERVIEW' userName='John Doe' />
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <main id='main' className='p-4 min-w-0'>
        <Outlet />
      </main>
    </div>
  );
}
