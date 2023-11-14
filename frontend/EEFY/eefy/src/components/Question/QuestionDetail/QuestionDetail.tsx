import React from 'react';
import { useRecoilState } from 'recoil';
import { DetailData } from '@/recoil/Notice';
import {QuestionPage} from '@/recoil/Question'
import {deleteQuestionDelete} from '@/api/Question/Question'

import dayjs from 'dayjs';
import { Container, Header, Wrappe, Title, Time, Img, UseName, Line, ContentBox, Content, UpdataBtn, DeleteBtn } from './QuestionDetail.style';

type Notice = {
  id: string;
  title: string;
  createTime: Date;
  imgUrl: string;
  useName: string;
  content: string;
};

function QuestionDetail() {
  const [notice, setNotice] = useRecoilState<Notice | null>(DetailData);
  const [questionPageUrl, setQuestionPageUrl] = useRecoilState(QuestionPage)

  const handleDetele = async(id:any)=>{
    const res = await deleteQuestionDelete(4)
    console.log(res)
  }
  return (
    <>
      <Container
        style={{
          flex: 8,
        }}
      >
        {notice?.title && (
          <>
            <Wrappe style={{ boxShadow: 'none', padding: '2% 5%' }}>
              <Header>
                <div className='flex'>
                  <Title>{notice.title}</Title>
                  <Time>{dayjs(notice.createTime).format('YYYY.MM.DD')}</Time>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '300px',
                    }}
                  >
                    <Img src={notice.imgUrl} />
                    <UseName>{notice.useName}</UseName>
                  </div>
                  <div className='flex' style={{ margin: '10px 0px 0px 0px', justifyContent: 'flex-end' }}>
                    <UpdataBtn onClick={()=>setQuestionPageUrl('updata')}>수정</UpdataBtn>
                    <DeleteBtn onClick={()=>handleDetele(notice.id)}>삭제</DeleteBtn>
                  </div>
                </div>
              </Header>
              <Line />
              <ContentBox>
                <Content>
                  {notice.content}
                  {notice.content}
                </Content>
              </ContentBox>
            </Wrappe>
          </>
        )}
      </Container>
    </>
  );
}

export default QuestionDetail;