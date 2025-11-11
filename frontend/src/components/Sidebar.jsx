import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Tag,
  CheckCircle,
  Flag,
  Activity,
  Settings as SettingsIcon,
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/BAS_logo.svg';

const _MOTION_ = motion;

const NAV = [
  { to: '/dashboard', icon: BarChart3, label: 'Overview' },
  { to: '/offers', icon: Tag, label: 'Offers' },
  { to: '/sales', icon: CheckCircle, label: 'Sales' },
  { to: '/geo', icon: Flag, label: 'GEO' },
  { to: '/insights', icon: Activity, label: 'Product insight' },
];

const itemHeight = 'h-12';
const itemBase = 'no-underline group flex items-center gap-3 outline-none';
const itemPad = 'px-4 py-3';
const easeOut = [0.2, 0.0, 0.2, 1];

export default function Sidebar({
    open = true,
    collapsed,
    setCollapsed,
    onClose = () => {},
}) {
  // ESC closes on mobile (no type annotation)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const rounding = collapsed ? 'rounded-md' : 'rounded-r-xl';
  const listGap = 'my-1';
  const collapsedLayout = collapsed
    ? `w-full ${itemHeight} py-0 px-0 justify-center ${listGap} first:mt-0 last:mb-0`
    : `w-full ${itemHeight} ${itemPad} ${listGap} first:mt-0 last:mb-0`;

  return (
    <>
      <div
        className={[
          'fixed inset-0 z-20 bg-black/40 backdrop-blur-[1px] md:hidden transition-opacity',
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        ].join(' ')}
        role='presentation'
        onClick={onClose}
        aria-hidden
      />

      <motion.aside
        id='sidebar'
        role='navigation'
        aria-label='Primary'
        animate={{
          width: collapsed ? 64 : 260,
        }}
        initial={false}
        transition={{ duration: 0.25, ease: easeOut }}
        className={[
          'fixed md:relative z-30',
          'h-dvh md:h-full max-h-dvh md:max-h-full min-h-0 top-0',
          'bg-emerald-900 text-emerald-50',
          'outline outline-1 outline-emerald-800',
          'flex flex-col',
          'md:translate-x-0',
          'overflow-hidden will-change-[width,transform]',
          '[backface-visibility:hidden] translate-z-0',
        ].join(' ')}
      >
        <header className='flex items-center border-b border-emerald-800/70 h-12 px-2'>
          {collapsed ? (
            <div className='w-full flex items-center justify-center'>
              <button
                type='button'
                className='inline-flex items-center justify-center h-8 w-8 rounded-md border border-emerald-700/70 hover:bg-emerald-800/50 transition-colors'
                aria-label='Expand sidebar'
                aria-expanded={!collapsed}
                onClick={() => setCollapsed((c) => !c)}
              >
                <ChevronsRight className='h-4 w-4 transition-transform' />
              </button>
            </div>
          ) : (
            //removing this since they are duplicating with the header
            <>
              {/* <div className="flex flex-1 items-center justify-center h-full translate-y-[4px]">
                                <img src={logo} alt="BAS World logo" className="max-h-6 object-contain" />
                            </div> */}

              <div className='ml-auto flex items-center gap-2'>
                <button
                  type='button'
                  className='hidden md:inline-flex items-center justify-center h-8 w-8 rounded-md border border-emerald-700/70 hover:bg-emerald-800/50 transition-colors'
                  aria-label='Collapse sidebar'
                  aria-expanded={!collapsed}
                  onClick={() => setCollapsed((c) => !c)}
                >
                  <ChevronsLeft className='h-4 w-4 transition-transform duration-200' />
                </button>

                <button
                  type='button'
                  className='md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md border border-emerald-700/70 hover:bg-emerald-800/50 transition-colors'
                  aria-label='Close menu'
                  onClick={onClose}
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            </>
          )}
        </header>

        <motion.nav
          className='px-2 pt-2 pb-3 flex-1 min-h-0 overflow-y-auto'
          initial={false}
          animate={collapsed ? 'collapsed' : 'expanded'}
          variants={{
            expanded: {
              transition: { staggerChildren: 0.02, delayChildren: 0.02 },
            },
            collapsed: {},
          }}
        >
          {NAV.map(({ to, icon: IconComp, label }) => {
            const _ICONCOMP_ = IconComp;
            return (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  [
                    itemBase,
                    rounding,
                    collapsedLayout,
                    'text-emerald-50/90 hover:text-white transition-colors',
                    'focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900',
                    collapsed && 'gap-0',
                    !isActive && 'hover:bg-emerald-800/50',
                    isActive && [
                      'bg-emerald-800/70 font-semibold',
                      'shadow-[inset_4px_0_0_0_rgba(110,231,183,1)]',
                    ],
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <span
                  className={[
                    'flex items-center',
                    collapsed ? 'w-full justify-center' : 'w-full min-w-0',
                  ].join(' ')}
                >
                  <span className='w-8 h-8 shrink-0 flex items-center justify-center'>
                    <IconComp className='h-5 w-5 translate-z-0' aria-label />
                  </span>

                  <motion.span
                    className={[
                      'min-w-0 flex-1 truncate',
                      collapsed
                        ? 'ml-0 max-w-0 opacity-0 -translate-x-1 overflow-hidden'
                        : 'ml-2 max-w-full opacity-100 translate-x-0',
                    ].join(' ')}
                    initial={false}
                    animate={{}}
                    transition={{ duration: 0.18, ease: easeOut }}
                  >
                    {label}
                  </motion.span>
                </span>
              </NavLink>
            );
          })}
        </motion.nav>

        <div className='mt-auto border-t border-emerald-800/80 px-2 py-2 shrink-0'>
          <NavLink
            to='/settings'
            onClick={onClose}
            title={collapsed ? 'Settings' : undefined}
            className={({ isActive }) =>
              [
                itemBase,
                rounding,
                collapsed
                  ? `w-full ${itemHeight} py-0 px-0 justify-center`
                  : `w-full ${itemHeight} ${itemPad}`,
                'text-emerald-50/90 hover:text-white transition-colors',
                'focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900',
                collapsed && 'gap-0',
                !isActive && 'hover:bg-emerald-800/50',
                isActive && [
                  'bg-emerald-800/60 font-semibold',
                  'shadow-[inset_4px_0_0_0_rgba(110,231,183,1)]',
                ],
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <span
              className={[
                'flex items-center',
                collapsed ? 'w-full justify-center' : 'w-full min-w-0',
              ].join(' ')}
            >
              <span className='w-8 h-8 shrink-0 flex items-center justify-center'>
                <SettingsIcon className='h-5 w-5 translate-z-0' aria-hidden />
              </span>
              <motion.span
                className={[
                  'min-w-0 flex-1 truncate',
                  collapsed
                    ? 'ml-0 max-w-0 opacity-0 -translate-x-1 overflow-hidden'
                    : 'ml-2 max-w-full opacity-100 translate-x-0',
                ].join(' ')}
                initial={false}
                animate={{}}
                transition={{ duration: 0.18, ease: easeOut }}
              >
                Settings
              </motion.span>
            </span>
          </NavLink>
        </div>
      </motion.aside>
    </>
  );
}
