import {useQuery} from "@tanstack/react-query";
import httpFetcher from "../../../lib/httpFetcher.ts";
import {ResponseEntity} from "../../../data/ResponseEntity.ts";
import {ContentDto} from "../../../data/dto/ContentDto.ts";
import MyQuizItem from "./MyQuizItem.tsx";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

const MyCodingTestList = ()=>{
    const {isLoading,data,isError,error} = useQuery({
        queryKey:['v1','dashboard','my','codingTest','last'],
        queryFn:httpFetcher<ResponseEntity<ContentDto[]>>
    })
    if(isLoading){
        return <>loading</>
    }
    if(!data){
        return <>nodata</>
    }
    if(isError){
        return <>{error}</>
    }
    if (data.data.length === 0) {
        return <div className={'flex flex-col justify-center items-center h-full'}>
            <div className={'text-lg my-4'}>아직 생성된 코딩테스트가 없습니다.</div>
            <Link to={"/content/codingTest"}><Button >코딩테스트 생성하러가기</Button></Link>

        </div>
    }
    return (
        <>
            {
                data.data.map(item=>{
                    return (
                        <Fragment key={item.id}>
                            <MyQuizItem item={item}/>
                        </Fragment>
                    )
                })
            }
        </>
    );
}
export default MyCodingTestList;