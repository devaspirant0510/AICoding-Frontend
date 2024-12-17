import {useMutation, useQuery} from "@tanstack/react-query";
import httpFetcher from "../../../../lib/httpFetcher.ts";
import {useLocation, useParams} from "react-router";
import {ResponseEntity} from "../../../../data/ResponseEntity.ts";
import {ContentDto} from "../../../../data/dto/ContentDto.ts";
import {Stepper} from "primereact/stepper";
import {useCallback, useEffect, useRef, useState} from "react";
import {StepperPanel} from "primereact/stepperpanel";
import {Card} from "primereact/card";
import {ProgressBar} from "primereact/progressbar";
import {Button} from "primereact/button";
import './custom.css'
import {Fieldset} from "primereact/fieldset";
import {ListBox} from "primereact/listbox";
import api from "../../../../lib/axiosSettings.ts";
import useAuthStore from "../../../../store/AuthStore.ts";
import {toast} from "react-toastify";
import useQuizStore from "../../../../store/QuizStore.ts";
import QuizFooter from "./components/QuizFooter.tsx";
import {MeterGroup} from "primereact/metergroup";
import {Navigate} from "react-router-dom";

const QuizPage = () => {
    const {id} = useParams();
    const {page, userSelection, setSelection, userResult, clearState} = useQuizStore();
    const totalBars = 5;
    const emptyBars = totalBars - userResult.length;

    const {isLoading, data, isError} = useQuery({
        queryKey: ["v1", "content", id],
        queryFn: httpFetcher<ResponseEntity<ContentDto>>
    })
    useEffect(() => {
        clearState()


    }, [])
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        toast.error("오류 발생 다시 시도해주세요")
        return <Navigate to={"/home"}/>
    }
    if (!data || !data.data) {
        return <>nodata</>
    }
    return (
        <div>
            <Card header={
                <div className={'flex flex-col items-center p-4'}>
                    <div className={'text-4xl mb-2'}>{data.data.studyName}</div>
                    <div className={'flex'}>
                        {userResult.map((result, index) => (
                            <div style={{background: result.color}} key={index} className={"w-24 h-2 rounded-full bg-gray-300 mx-0.5 my-1"}/>
                        ))}
                        {Array.from({length: emptyBars}).map((_, index) => (
                            <div key={`empty-${index}`} className="w-24 h-2 bg-gray-300 rounded-full mx-0.5 my-1"/>
                        ))}
                    </div>
                    <div>{page}/5</div>
                </div>
            }/>
            <Card className={'mt-4'} header={
                    <div className={'flex flex-col'}>
                        <Fieldset legend={'문제'}><p>{data.data.quiz[page].question}</p></Fieldset>
                        <div><ListBox value={userSelection} onChange={(e) => {
                                setSelection(e.value)
                            }} options={data.data.quiz[page].choices}/>
                        </div>
                    </div>
                }
                footer={<QuizFooter contentId={data.data.id} quizId={data.data.quiz[page].id} choices={data.data.quiz[page].choices}/>}>
            </Card>
        </div>
    )

}
export default QuizPage