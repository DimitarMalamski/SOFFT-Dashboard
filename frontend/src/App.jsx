import { useEffect, useState } from 'react';

export default function App() {
  const [msg, setMsg] = useState('loading…');
  const [err, setErr] = useState('');

  useEffect(() => {
    const ctrl = new AbortController();
    fetch('/api/hello', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.text() : Promise.reject(r.statusText)))
      .then((text) => setMsg(text))
      .catch((e) => setErr(String(e)));
    return () => ctrl.abort();
  }, []);

  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-50'>
      <div className='p-8 rounded-2xl shadow bg-white space-y-2'>
        <h1 className='text-2xl font-bold'>React + Tailwind</h1>
        {err ? (
          <p className='text-red-600'>Error: {err}</p>
        ) : (
          <p className='text-slate-700'>
            Backend says: <span className='font-mono'>{msg}</span>
          </p>
        )}
      </div>
    </main>
  );
}
