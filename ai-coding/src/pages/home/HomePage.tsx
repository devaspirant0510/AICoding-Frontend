import HomeHeader from "./components/HomeHeader.tsx";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import MainLayout from "../../layout/MainLayout.tsx";

const studyData = {
    year: 2024,
    month: 11,
    days: [
        {date: "2024-11-01", completed: true},
        {date: "2024-11-02", completed: false},
        {date: "2024-11-03", completed: true},
        {date: "2024-11-04", completed: true},
        {date: "2024-11-05", completed: false},
        {date: "2024-11-06", completed: true},
        {date: "2024-11-07", completed: true},
        {date: "2024-11-08", completed: false},
        {date: "2024-11-09", completed: true},
        {date: "2024-11-10", completed: false},
        {date: "2024-11-11", completed: true},
        {date: "2024-11-12", completed: true},
        {date: "2024-11-13", completed: false},
        {date: "2024-11-14", completed: true},
        {date: "2024-11-15", completed: false},
        {date: "2024-11-16", completed: true},
        {date: "2024-11-17", completed: true},
        {date: "2024-11-18", completed: false},
        {date: "2024-11-19", completed: true},
        {date: "2024-11-20", completed: false},
        {date: "2024-11-21", completed: false},
        {date: "2024-11-22", completed: false},
        {date: "2024-11-23", completed: false},
        {date: "2024-11-24", completed: false},
        {date: "2024-11-25", completed: false},
        {date: "2024-11-26", completed: false},
        {date: "2024-11-27", completed: false},
        {date: "2024-11-28", completed: false},
        {date: "2024-11-29", completed: false},
        {date: "2024-11-30", completed: false},
    ],
};
const HomePage = () => {
    const renderStudyProgress = (studyData: any) => {
        // 11월 1일이 금요일이라서 그에 맞게 빈 칸을 채움 (금요일부터 시작)
        const firstDayOfMonth = 5; // 2024-11-01이 금요일이므로 index 5 (0은 일요일)
        const totalDaysInMonth = 30; // 11월은 30일까지

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
    return (
        <MainLayout>
            <div style={{display: 'flex', background: 'var(--cogray)', justifyContent: 'space-between'}}>
                <div style={{padding: '10px', alignItems: 'center'}}>
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <h1>나의 학습현황</h1>
                        <div style={{color: 'gray', fontSize: '10px'}}>더보기</div>
                    </div>
                    <h3>2024/11</h3>
                    {renderStudyProgress(studyData)}
                </div>
                <div style={{padding: '10px', alignItems: 'center'}}>
                    <div style={{display: "flex", justifyContent: 'space-between', marginBottom: '10px'}}>
                        <h1>최근에 진행한 학습</h1>
                        <div style={{color: 'gray', fontSize: '10px'}}>더보기</div>
                    </div>
                    <div style={{width: '280px', background: '#44475A'}}>
                        <div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'start'
                                }}>
                                    <span style={{color: 'white'}}>RUST 기초 문법 퀴즈</span>
                                    <span style={{color: 'white'}}>난이도 : 하</span>
                                </div>
                                <div style={{color: 'white'}}>1일전</div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '280px', marginTop: '10px', background: '#44475A'}}>
                        <div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'start'
                                }}>
                                    <span style={{color: 'white'}}>괄호제거 코딩 테스트</span>
                                    <span style={{color: 'white'}}>난이도 : 하</span>
                                </div>
                                <div style={{color: 'white'}}>1일전</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{padding: '10px'}}>
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <h1>나의 등급</h1>
                    </div>
                    <div style={{justifyContent: 'start'}}>
                        <span>다이아몬드1</span>
                        <div>
                            <div style={{
                                width: '100%',
                                backgroundColor: 'var(--secondary)',
                                borderRadius: '10px',
                                height: '10px',
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `70%`, // progress 값을 백분율로 설정
                                    backgroundColor: 'var(--cogreen)',
                                    borderRadius: '10px'
                                }}></div>
                            </div>
                        </div>
                        <div>다음 티어까지 필요한 포인트: 320</div>

                    </div>
                    <img src={'./diamond.png'} width={180} height={180}/>

                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{background: 'var(--cogray)', width: '300px', marginTop: '20px'}}>
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
                </div>
                <div style={{background: 'var(--cogray)', width: '300px', marginTop: '20px'}}>
                    <div style={{fontSize: '30px', marginTop: '15px'}}>코딩테스트</div>
                    <div style={{marginTop: '15px'}}>
                        생성형 AI 가 코딩테스트 문제를 생성해주며<br/>
                        체점 및 피드백을 받습니다.
                    </div>
                    <Button
                        style={{marginTop: '10px', marginBottom: '20px', background: 'var(--copink)', color: 'white'}}>퀴즈
                        생성하기</Button>
                </div>
                <div style={{background: 'var(--cogray)', width: '300px', marginTop: '20px'}}>
                    <div style={{fontSize: '30px', marginTop: '15px'}}>퀴즈</div>
                    <div style={{marginTop: '15px'}}>
                        생성형 AI가 작성한 프로젝트의 코드를 <br/>
                        분석하여 개선점을 리뷰해줍니다.
                    </div>
                    <Button
                        style={{marginTop: '10px', marginBottom: '20px', background: 'var(--copink)', color: 'white'}}>퀴즈
                        생성하기</Button>
                </div>

            </div>

        </MainLayout>
    )
}
export default HomePage;