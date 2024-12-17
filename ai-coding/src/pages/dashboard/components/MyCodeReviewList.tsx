import {useQuery} from "@tanstack/react-query";
import httpFetcher from "../../../lib/httpFetcher.ts";
import {ResponseEntity} from "../../../data/ResponseEntity.ts";
import {ContentDto} from "../../../data/dto/ContentDto.ts";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {Fragment} from "react";
import MyQuizItem from "./MyQuizItem.tsx";

const MyCodeReviewList = () => {
    const {isLoading, data, isError, error} = useQuery({
        queryKey: ['v1', 'dashboard', 'my', 'codeReview', 'last'],
        queryFn: httpFetcher<ResponseEntity<ContentDto[]>>
    })
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return (
            <div className={'flex flex-col justify-center items-center h-full'}>
                <div className={"text-lg my-4 text-red-500"}>데이터를 불러오는데 오류가 발생했습니다.</div>
            </div>
        )
    }
    if (!data) {
        return <>nodata</>
    }
    if (data.data.length === 0) {
        return (
            <div className={'flex flex-col justify-center items-center h-full'}>
                <div className={"text-lg my-4"}>아직 생성된 코드리뷰가 없습니다.</div>
                <Link to={"/content/codingTest"}>
                    <Button>
                        코드리뷰 생성하러가기
                    </Button>
                </Link>

            </div>
        )
    }
    return (
        <>
            {
                data.data.map(item => {
                    return <Fragment key={item.id}>
                        <MyQuizItem item={item}/>
                    </Fragment>
                })
            }

        </>
    )
}
export default MyCodeReviewList;