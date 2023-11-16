"use client"
import styled from "styled-components"
import ProblemCheckBox from "@/components/Homework/Problem/ProblemCheckBox"
import ProblemFooter from "@/components/Homework/Problem/ProblemFooter"
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from "recoil";
import { homeworkPage} from '@/recoil/Problem'
import {Problems, MySolved, HomeworkIds, SolvedProblem} from '@/recoil/Homework'
import { useParams } from 'next/navigation';
import {getProblem, postSolveProblem} from '@/api/Homework/Problem'
import '@/styles/swal.css'
import Swal from 'sweetalert2'
function Homework({ children }: { children: React.ReactNode }){
  const router = useRouter();
  const [problem, setProblem] = useRecoilState(Problems);
  const [mySolved, setMySolved] = useRecoilState<any>(MySolved)
  const [page, setPage] = useRecoilState(homeworkPage)
  const [solved, setSolved] = useRecoilState(SolvedProblem)
  const ids = useRecoilValue(HomeworkIds)
  const pageInfo = useParams();
  const pageNum = pageInfo.problemid;
  const classId = pageInfo.classId;
  const pageNumber: string = Array.isArray(pageNum) ? pageNum[0] : pageNum;
  
  const handleExit = ()=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      text: "나가시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "나가기",
      cancelButtonText: "취소",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/class/${classId}/dashboard`)
        setSolved({})
        setMySolved({})
        setProblem({})
        setPage('problem')
      } 
    });
  }
  const handleSave = ()=>{
    console.log('채점하기')
    console.log(mySolved)
    if ( Object.values(mySolved).length!=problem.length){
      setPage("problem")
      Swal.fire({
        icon: "warning",
        title: "아직 못푼 문제가 있습니다",
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "마치시겠습니까?",
        customClass: {
          container: 'custom-swal-container',
          popup: 'custom-swal-popup'
        }
      }).then((result) => {
        document.body.classList.remove('swal2-shown');
        if (result.isConfirmed) {
          postSolve()
        }
      });
    }
  }

  // 제출
  const postSolve = async()=>{
    const formData = new FormData();
    const solveProblemRequest = {
      homeworkQuestionId:mySolved[Number(pageNumber)-1].homeworkQuestionId,
      homeworkStudentId:ids.homeworkStudentId,
      submitAnswer:mySolved[Number(pageNumber)-1].answer
    }
    const jsonBlob = new Blob([JSON.stringify(solveProblemRequest)], {
      type: "application/json",
    });
      formData.append("solveProblemRequest", jsonBlob);
    const res = await postSolveProblem(formData)
    console.log(res)
    if(res?.status===200){
      getSolved()
    }
  }

  // 해설 요청
  const getSolved = async()=>{
    const res = await getProblem(ids.classHomeworkId)
    console.log(res)
    if(res?.status===200){
      setSolved(res.data.solvedProblem)
      setProblem(res.data.problems)
      setPage("explanation")
      router.push("/class/studylist/reading/1/explanation/1")
    }
  }

  const handleSolved = ()=>{
    console.log(pageNum)
    Swal.fire({
      title: `정답은 "${problem[Number(pageNumber)-1]?.homeworkQuestion.answer}"`,
      // showClass: {
      //   popup: `
      //     animate__animated
      //     animate__fadeInUp
      //     animate__faster
      //   `
      // },
      // hideClass: {
      //   popup: `
      //     animate__animated
      //     animate__fadeOutDown
      //     animate__faster
      //   `
      // }
    });
  }

  return(
    <Container className="w-full h-full flex">

      <div className="flex flex-col" style={{flex:7, border:'1px solid black', width:'100%'}}>
        <Header>
          <Title>
            문제집 이름
          </Title>
          {page==='explanation' && (
            <>
              <SolvedBtn onClick={handleSolved}>
                정답 보기
              </SolvedBtn>
            </>
          )}
        </Header>
        <div className="h-full" 
        style={{
          flex:7, 
          margin:'0px 0px 0px 10%',
          width:'80%'
          }}>
          {children}
        </div>
        <ProblemFooter/>
      </div>

      <Wrappe>
        <Checkbox>
          <ProblemCheckBox/>
        </Checkbox>
        <BtnBox>
          <ExitBtn>
            <div onClick={handleExit}>
              나가기
            </div>
          </ExitBtn>
          <SaveBtn>
            <div onClick={handleSave}>
              마치기
            </div>
          </SaveBtn>
        </BtnBox>
      </Wrappe>
    </Container>
  )
}
export default Homework

const Container = styled.div`
border: 1px solid black;
`
const Header = styled.div`
border: 1px solid black;
flex: 0.8;
display: flex;
`
const Title = styled.div`
`
const SolvedBtn = styled.div`
margin: 0px 0px 0px auto;
`
const Wrappe = styled.div`
flex: 2;
width: 20%;
border: 1px solid black;
margin: 0px 0px 0px 6%;
`
const Checkbox = styled.div`
height: 80%;
margin: 20px;
border: 1px solid black;
overflow: auto;
`
const ExitBtn = styled.div`
border: 1px solid black;
flex: 4;
height: 40px;
background-color: gray;
color: white;
display: flex;
justify-content: center;
align-items: center;
margin-right:10px;
`
const BtnBox = styled.div`
border: 1px solid black;
height: 10%;
display: flex;
justify-content: center;
align-items: center;
display: flex;
padding: 10px;
`
const SaveBtn = styled.div`
border: 1px solid black;
flex: 4;
height: 40px;
background-color: gray;
color: white;
display: flex;
justify-content: center;
align-items: center;
`