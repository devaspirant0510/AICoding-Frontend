import {useQuery} from "@tanstack/react-query";
import httpFetcher from "../../../lib/httpFetcher.ts";
import {ContentDto} from "../../../data/dto/ContentDto.ts";
import {ResponseEntity} from "../../../data/ResponseEntity.ts";
import MyQuizItem from "./MyQuizItem.tsx";
import {Fragment} from "react";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

const MyQuizList = () => {
    const {isLoading, data, isError, error} = useQuery({
        queryKey: ['v1', 'dashboard', 'my', 'quiz', 'last'],
        queryFn: httpFetcher<ResponseEntity<ContentDto[]>>
    })
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>error</>
    }
    if (!data) {
        return <>nodata</>
    }
    if (data.data.length === 0) {
        return <div className={'flex flex-col justify-center items-center h-full'}>
            <div className={'text-lg my-4'}>아직 생성된 퀴즈가 없습니다.</div>
            <Link to={"/content/quiz"}><Button >퀴즈 생성하러가기</Button></Link>

        </div>
    }
    return (
        <>
            {
                data.data.map((v, item) => {
                    return <Fragment key={item}>
                        <MyQuizItem item={v}/>
                    </Fragment>
                })
            }

        </>
    )
}
export default MyQuizList;