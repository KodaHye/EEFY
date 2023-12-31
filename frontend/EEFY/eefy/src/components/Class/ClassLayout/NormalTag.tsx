'use client';

import React, { Children } from 'react';
import ProfileTag from './ProfileTag';
import { useRecoilValue } from 'recoil';
import { EnterClassTitle } from '@/recoil/ClassCreate';

export default function NormalTag() {
  const classTitle = useRecoilValue(EnterClassTitle);
  console.log(classTitle);
  const dummyData = {
    title: 'TOEIC 900 완성반',
    content: 'English Education For You',
  };
  return (
    <div
      className='w-5/6 shadow-lg rounded-lg py-2 px-3'
      style={{
        background: 'linear-gradient(99deg, #999BD5 53.12%, #4F489B 155.43%)',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(131, 129, 129, 0.2)',
        width: '97%',
        height: '80%',
      }}
    >
      <div className='flex justify-between items-center h-full'>
        <div style={{ flex: '1' }} className='ml-5 flex flex-col'>
          <div>
            <p className='text-3xl font-bold text-white'>{classTitle}</p>
          </div>
          <div>
            <p className='text-lg' style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              {dummyData.content}
            </p>
          </div>
        </div>
        <div style={{ flex: 0.25 }} className='mr-5 flex justify-center items-center'>
          <ProfileTag />
          {/* <p className='text-sm font-extrabold '>점수: 90점</p> */}
        </div>
      </div>
    </div>
  );
}
