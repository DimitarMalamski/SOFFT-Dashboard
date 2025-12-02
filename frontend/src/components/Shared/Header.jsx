import { Menu } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "../../router/pageTitles.js";
import logo from '../../assets/BAS_logo.svg';

export default function Header({ onToggleSidebar }) {
    const location = useLocation();

    const title = PAGE_TITLES[location.pathname] || 'OVERVIEW';

  return (
    <header className='sticky top-0 z-40 bg-emerald-800/50 text-white shadow'>
      <div className='relative flex h-16 items-center justify-between px-3 sm:px-4'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            aria-label='Open sidebar'
            onClick={() => onToggleSidebar?.()}
            className='inline-flex items-center justify-center rounded hover:bg-white/10 p-2 md:hidden'
          >
            <Menu className='h-5 w-5' />
          </button>

          <a href='/frontend/public' className='hidden md:inline-flex items-center gap-2'>
            <img src={logo} alt='' className='h-6 w-auto' />
          </a>
        </div>

        <div className='absolute inset-x-0 text-center pointer-events-none'>
          <h1 className='font-semibold tracking-wide'>{title}</h1>
        </div>
      </div>
    </header>
  );
}
