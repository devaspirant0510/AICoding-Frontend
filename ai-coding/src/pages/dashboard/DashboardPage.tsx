import {useQuery} from "@tanstack/react-query";
import httpFetcher from "../../lib/httpFetcher.ts";
import {ResponseEntity} from "../../data/ResponseEntity.ts";
import {AccountDto} from "../../data/dto/AccountDto.ts";
import {Link, Navigate} from "react-router-dom";
import {Card} from "primereact/card";
import Gravatar from "react-gravatar";
import MyTier from "../home/components/MyTier.tsx";
import ProfileTier from "./components/ProfileTier.tsx";
import MyQuizList from "./components/MyQuizList.tsx";
import MainLayout from "../../layout/MainLayout.tsx";
import MyCodingTestList from "./components/MyCodingTestList.tsx";
import MyTierText from "../../components/molecule/MyTierText.tsx";
import MyCodeReviewList from "./components/MyCodeReviewList.tsx";

const DashboardPage = () => {
    const {isLoading, data: user} = useQuery({
        queryKey: ['v1', 'account', 'token', 'access', 'verify'],
        queryFn: httpFetcher<ResponseEntity<AccountDto>>
    },);
    if (isLoading) {
        return <>loading</>
    }
    if (!user) {
        return <Navigate to={'/start'}/>
    }
    return (
        <MainLayout>
            <div className={'text-cowhite text-2xl text-start '}>
                반갑습니다&nbsp;
                <span className={'text-coblue text-3xl'}>{user.data.nickname}</span>&nbsp;
                님
            </div>
            <Card className={'my-2'}>
                <div className={'flex items-center p-4 m-2 justify-start'}>
                    <Gravatar className={'rounded-full'} email={user.data.nickname} size={120}/>
                    <div className={'ml-2 text-start flex flex-col justify-start items-start h-full'}>
                        <div className={'ml-1 text-xl'}>
                            {user.data.nickname}
                        </div>
                        <MyTierText exp={user.data.exp}/>
                    </div>
                </div>
            </Card>
            <div className={'flex justify-between mt-2'}>
                <Card className={'flex-1 text-start p-2 mr-2'} style={{height: '450px'}}
                      header={<div className={'flex justify-between items-center p-2'}>
                          <div className={'text-2xl'}>퀴즈</div>
                          <Link to={"./quiz"}><div className={'text-gray-500 text-sm'}>더보기</div></Link>
                      </div>}>
                    <MyQuizList/>
                </Card>
                <Card className={'flex-1 text-start p-2 ml-2'} style={{height: "450px"}}
                      header={<div className={'flex justify-between items-center p-2'}>
                          <div className={'text-2xl'}>코딩테스트</div>
                          <Link to={"./codingTest"}>
                              <div className={'text-gray-500 text-sm'}>더보기</div>
                          </Link>
                      </div>}>
                    <MyCodingTestList/>
                </Card>
            </div>
            <div className={'flex '}>
                <Card className={'flex-1 text-start p-2  mt-4'} style={{height: '450px'}}
                      header={<div className={'flex justify-between items-center p-2'}>
                          <div className={'text-2xl'}>코드리뷰</div>
                          <Link to={"./codeReview"}>
                              <div className={'text-gray-500 text-sm'}>더보기</div>
                          </Link>

                      </div>}
                >
                    <MyCodeReviewList/>
                </Card>
            </div>
        </MainLayout>
    )
}
export default DashboardPage;