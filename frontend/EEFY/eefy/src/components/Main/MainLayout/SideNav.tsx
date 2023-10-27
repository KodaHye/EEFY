import React from 'react';

export default function SideNav() {
  return (
    <div className='w-full h-full'>
      <div className='h-full' style={{ display: 'flex', justifyContent: 'center' }}>
        <ul
          className='menu bg-base-200 rounded-box w-3/6'
          style={{
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(131, 129, 129, 0.2)',
            background: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* toggle(hamburger) */}
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <label className='btn swap swap-rotate bg-transparent border-none' style={{ padding: '0px 14px' }}>
              {/* this hidden checkbox controls the state */}
              <input type='checkbox' />

              {/* hamburger icon */}
              <svg className='swap-off fill-current bg-transparent' xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'>
                <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
              </svg>

              {/* close icon */}
              <svg className='swap-on fill-current bg-transparent' xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'>
                <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
              </svg>
            </label>
          </div>

          <br style={{ height: '10px' }} />

          {/* 메인 홈(클래스 생성 부분) */}
          <li className='w-full' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </a>
          </li>
          <br />

          {/* 마이페이지 - 학생 OR 클래스관리 - 강사  */}
          <li className='w-full' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </a>
          </li>

          <br />
        </ul>
      </div>
    </div>
  );
}