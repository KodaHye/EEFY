'use client';
import { privateApi } from '..';

interface postMakeHomeworkDataType {
  title: string;
  content: string;
  type: string;
}

// 공통
export const postMakeHomework = async (data: postMakeHomeworkDataType) => {
  try {
    const res = await privateApi.post('/homework/make', data);
    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// Speaking
// 파일 업로드 시 STT 요청
export const postSTT = async (data: FormData) => {
  try {
    const res = await privateApi.post('/ai/stt', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};