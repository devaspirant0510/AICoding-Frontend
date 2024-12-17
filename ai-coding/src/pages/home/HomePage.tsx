import HomeHeader from "./components/HomeHeader.tsx";
import {Button} from "primereact/button";
import {Link, Navigate} from "react-router-dom";
import MainLayout from "../../layout/MainLayout.tsx";
import {useQuery} from "@tanstack/react-query";
import httpFetcher from "../../lib/httpFetcher.ts";
import useAuthStore from "../../store/AuthStore.ts";
import {AccountDto} from "../../data/dto/AccountDto.ts";
import {ResponseEntity} from "../../data/ResponseEntity.ts";
import {toast} from "react-toastify";
import {Card} from "primereact/card";
import MyTier from "./components/MyTier.tsx";
import LastCreateContent from "./components/LastCreateContent.tsx";
import {Divider} from "primereact/divider";

const studyData = {
    year: 2024,
    month: 12,
    days: [
        {date: "2024-12-01", completed: true},
        {date: "2024-12-02", completed: false},
        {date: "2024-12-03", completed: true},
        {date: "2024-12-04", completed: true},
        {date: "2024-12-05", completed: false},
        {date: "2024-12-06", completed: true},
        {date: "2024-12-07", completed: true},
        {date: "2024-12-08", completed: false},
        {date: "2024-12-09", completed: true},
        {date: "2024-12-10", completed: false},
        {date: "2024-12-11", completed: true},
        {date: "2024-12-12", completed: true},
        {date: "2024-12-13", completed: false},
        {date: "2024-12-14", completed: true},
        {date: "2024-12-15", completed: false},
        {date: "2024-12-16", completed: true},
        {date: "2024-12-17", completed: true},
        {date: "2024-12-18", completed: false},
        {date: "2024-12-19", completed: false},
        {date: "2024-12-20", completed: false},
        {date: "2024-12-21", completed: false},
        {date: "2024-12-22", completed: false},
        {date: "2024-12-23", completed: false},
        {date: "2024-12-24", completed: false},
        {date: "2024-12-25", completed: false},
        {date: "2024-12-26", completed: false},
        {date: "2024-12-27", completed: false},
        {date: "2024-12-28", completed: false},
        {date: "2024-12-29", completed: false},
        {date: "2024-12-30", completed: false},
        {date: "2024-12-31", completed: false},
    ],
};
const HomePage = () => {
    const {isLoading, data: user} = useQuery({
        queryKey: ['v1', 'account', 'token', 'access', 'verify'],
        queryFn: httpFetcher<ResponseEntity<AccountDto>>
    },)
    console.log("user", user)
    const renderStudyProgress = (studyData: any) => {
        // 11월 1일이 금요일이라서 그에 맞게 빈 칸을 채움 (금요일부터 시작)
        const firstDayOfMonth = 0; // 2024-11-01이 금요일이므로 index 5 (0은 일요일)
        const totalDaysInMonth = 31; // 11월은 30일까지

        // 빈 칸을 앞에 채워서 그리드 맞추기
        const paddedDays = Array(firstDayOfMonth).fill(null).concat(studyData.days);

        return (
            <div style={{display: "grid", gridTemplateColumns: "repeat(7, 30px)", gap: "5px"}}>
                {paddedDays.map((day, index) => (
                    <div
                        key={index}
                        style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: day ? (day.completed ? "#8BE9FD" : "gray") : "transparent", // 공부한 날은 초록색, 안 한 날은 회색, 빈 칸은 투명
                            borderRadius: "5px",
                            textAlign: "center",
                            lineHeight: "30px",
                            color: day ? "white" : "transparent", // 날짜가 있는 경우에만 글자 색을 표시
                        }}
                    >
                    </div>
                ))}
            </div>
        );
    };
    if (isLoading) {
        return <>loading</>
    }
    if (!user) {
        toast.error("로그인후 이용해주세요")
        return <Navigate to={'/start'}/>
    }
    return (
        <MainLayout>
            <div className={'bg-third my-2 rounded-lg'}>
                <div className={'text-start p-2 text-xl mt-2'}>
                    <span className={'text-2xl font-bold ml-2 '}>{user?.data.nickname} </span>
                    님 환영합니다.
                </div>
                <div className={'flex justify-between'}>
                    <Card className={'m-4 flex-1'} header={<div className={'text-xl text-start m-2'}>나의 학습현황</div>}>
                        <div className={'flex flex-col items-center'}>
                            <div className={'text-lg mb-2'}>2024/12</div>
                            {renderStudyProgress(studyData)}
                        </div>
                    </Card>
                    <Card className={'m-4 flex-1'} header={<div className={'text-xl text-start m-2'}>최근에 진행한 학습</div>}>
                        <Divider/>
                        <LastCreateContent/>
                    </Card>
                    <Card header={<div className={'flex justify-between items-center'}><div className={'text-xl text-start m-2'}>나의 등급</div><Link to={"tierInfo"}><i className={'mr-2 pi pi-question-circle'}></i></Link></div>} className={'m-4 flex-1'}>
                        <div className={'m-4'}>
                            <MyTier exp={user.data.exp}/>

                        </div>

                    </Card>
                </div>
            </div>
            <div className={'flex justify-between bg-third my-2 rounded-lg pt-4 pb-4'}>
                <Card className={'flex-1 m-4'}>
                    <div style={{fontSize: '30px', marginTop: '15px'}}>퀴즈</div>
                    <div style={{marginTop: '15px'}}>
                        생성형 AI 가 생성해 주는 퀴즈로<br/>
                        프로그래밍 능력을 상승시킵니다.
                    </div>
                    <Link to={"/content/quiz"}>
                        <Button
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                                background: 'var(--copink)',
                                color: 'white'
                            }}>퀴즈
                            생성하기</Button>
                    </Link>
                </Card>
                <Card className={'flex-1 m-4'}>
                    <div style={{fontSize: '30px', marginTop: '15px'}}>코딩테스트</div>
                    <div style={{marginTop: '15px'}}>
                        생성형 AI 가 코딩테스트 문제를 생성해주며<br/>
                        체점 및 피드백을 받습니다.
                    </div>
                    <Link to={"/content/codingTest"}>
                        <Button
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                                background: 'var(--copink)',
                                color: 'white'
                            }}>
                            코딩테스트 생성하기
                        </Button>
                    </Link>
                </Card>
                <Card className={'flex-1 m-4'}>
                    <div style={{fontSize: '30px', marginTop: '15px'}}>코드리뷰</div>
                    <div style={{marginTop: '15px'}}>
                        생성형 AI가 작성한 프로젝트의 코드를 <br/>
                        분석하여 개선점을 리뷰해줍니다.
                    </div>
                    <Link to={'/content/codeReview'}>

                        <Button
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                                background: 'var(--copink)',
                                color: 'white'
                            }}>
                            코드리뷰 받기</Button>
                    </Link>
                </Card>

            </div>

        </MainLayout>
    )
}
export default HomePage;