import {ResponseEntity} from "../../../data/ResponseEntity.ts";
import httpFetcher from "../../../lib/httpFetcher.ts";
import {ContentDto} from "../../../data/dto/ContentDto.ts";
import MainLayout from "../../../layout/MainLayout.tsx";
import {Card} from "primereact/card";
import {useQuery} from "@tanstack/react-query";
import BackButton from "../../../components/atom/BackButton.tsx";
import MyQuizItem from "../components/MyQuizItem.tsx";

const DashboardQuizList = () => {
    const {isLoading, isError, data} = useQuery({
        queryKey: ["v1", "quiz"],
        queryFn: httpFetcher<ResponseEntity<ContentDto[]>>
    })
    if (isLoading) {
        return <>loading</>
    }
    if (!data) {
        return <>nodata</>
    }
    if (isError) {
        return <>error</>
    }
    return (
        <MainLayout>

            <Card header={<div className={'text-start m-4 flex items-center'}><BackButton/>
                <span className={'text-2xl ml-4'}>퀴즈</span>
            </div>}>
                <div className={'m-4'}>
                    {data?.data.map(item => {
                        return <MyQuizItem item={item}/>
                    })}
                </div>
            </Card>

        </MainLayout>
    )
}
export default DashboardQuizList;