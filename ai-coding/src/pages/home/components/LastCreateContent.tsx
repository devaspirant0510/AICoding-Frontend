import React, {Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import httpFetcher from "../../../lib/httpFetcher.ts";
import {ContentDto} from "../../../data/dto/ContentDto.ts";
import {ResponseEntity} from "../../../data/ResponseEntity.ts";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ProgressSpinner} from "primereact/progressspinner";
import {Message} from "primereact/message";
import MyQuizItem from "../../dashboard/components/MyQuizItem.tsx";
import {Divider} from "primereact/divider";
import {Link} from "react-router-dom";

const LastCreateContent = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["v1", "content", "last"],
        queryFn: httpFetcher<ResponseEntity<ContentDto[]>>,
    });

    if (isLoading) {
        return (
            <div style={{textAlign: "center", padding: "20px"}}>
                <ProgressSpinner/>
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{textAlign: "center", padding: "20px"}}>
                <Message severity="error" text="데이터를 불러오는 중 오류가 발생했습니다."/>
            </div>
        );
    }
    if (data?.data.length === 0) {
        return <div className={'text-center  text-gray-500 mt-4'}>생성된 컨텐츠가 존재하지 않습니다.</div>
    }

    return (

        <div>
            {data?.data.map((item) => {
                return <Fragment key={item.id}>
                    <Link
                        to={`/content/${item.studyType === "QUIZ" ? "quiz" : item.studyType === "CODE_REVIEW" ? "codeReview" : "codingTest"}/${item.id}`}>

                        <div className={'flex-col flex items-start ml-2'}>
                            <div>{item.studyName}</div>
                            <div>{item.studyType === "QUIZ" ? "퀴즈" : item.studyType === "CODE_REVIEW" ? "코드리뷰" : "코딩테스트"}</div>
                        </div>
                        <Divider/>
                    </Link>

                </Fragment>
            })}
        </div>
    );
};

export default LastCreateContent;
