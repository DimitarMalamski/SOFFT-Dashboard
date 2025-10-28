import React from 'react';

const medalColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];

export default function Leaderboard({ className = '', salesmanData }) {
  return (
    <div
      className={`rounded-none bg-emerald-950 text-white p-4 sm:p-6 shadow-sm flex flex-col ${className}`}
    >
      <h2 className='text-base sm:text-lg font-semibold mb-4 text-emerald-100'>
        Leaderboard
      </h2>
      <div className='overflow-y-auto max-h-[360px] pr-1'>
        <ol className='space-y-2'>
          {salesmanData.map((data, index) => (
            <li
              key={data.salesman}
              className='flex items-center gap-4 p-2 rounded hover:bg-emerald-900 transition'
            >
              <div
                className={`text-lg font-bold w-6 text-center ${
                  medalColors[index] || 'text-white'
                }`}
              >
                {index + 1}
              </div>

              <div className='w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center text-sm font-semibold'>
                {data.salesman[0]}
              </div>

              <span className='text-sm sm:text-base font-medium'>{data.salesman} ({data.count})</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
