import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <div className='h-dvh max-h-dvh min-h-0 overflow-hidden grid grid-rows-[auto_1fr] grid-cols-[260px_1fr] bg-emerald-950 text-state-100'>
      <div className='col-span-2'>
        <Header title='OVERVIEW' userName='John Doe' />
      </div>
      <div className='min-h-0 overflow-hidden'>
        <Sidebar open={open} onClose={() => setOpen(false)} />
      </div>
      <main id='main' className='p-4 min-w-0 min-h-0 overflow-y-auto'>
        <div className='mx-auto max-w-7xl'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
