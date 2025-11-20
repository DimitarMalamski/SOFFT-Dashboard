import { Menu, Bell, Settings, User } from 'lucide-react';
import logo from '../../assets/BAS_logo.svg';

export default function Header({
  title = 'OVERVIEW',
  userName = 'John Doe',
  onToggleSidebar,
}) {
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

        <div className='flex items-center gap-1 sm:gap-2'>
          <button
            type='button'
            aria-label='Notifications'
            className='rounded p-2 hover:bg-emerald-800/50'
          >
            <Bell className='h-5 w-5' />
          </button>
          <button
            type='button'
            aria-label='Settings'
            className='rounded p-2 hover:bg-white/10'
          >
            <Settings className='h-5 w-5' />
          </button>

          <div className='hidden sm:flex items-center gap-2 pl-1'>
            <div className='h-7 w-7 rounded-full bg-white/20 flex items-center justify-center'>
              <User className='h-4 w-4' />
            </div>
            <span className='text-sm'>{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
