import {useMutation, useQuery} from "@tanstack/react-query";
import httpFetcher from "../../../../lib/httpFetcher.ts";
import {useLocation, useParams} from "react-router";
import {ResponseEntity} from "../../../../data/ResponseEntity.ts";
import {ContentDto} from "../../../../data/dto/ContentDto.ts";
import {Stepper} from "primereact/stepper";
import {useCallback, useRef, useState} from "react";
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

const QuizPage = () => {
    const {id} = useParams();
    const { page, userSelection, setSelection ,userResult} = useQuizStore();
    const totalBars = 5;
    const emptyBars = totalBars - userResult.length;

    const {isLoading, data} = useQuery({
        queryKey: ["v1", "content", id],
        queryFn: httpFetcher<ResponseEntity<ContentDto>>
    })
    if (isLoading) {
        return <>loading</>
    }
    if (!data || !data.data) {
        return <>nodata</>
    }
    console.log(userResult)
    // 기본 5개의 막대 렌더링
    return (
        <div>
            <Card header={
                <div className={'flex flex-col items-center'}>
                    <div className={'text-4xl mb-2'}>
                        {data.data.studyName}
                    </div>
                    <div className={'flex'}>
                        {userResult.map((result, index) => (
                            <div
                                style={{background:result.color}}
                                key={index}
                                className={"w-24 h-2 rounded-full bg-gray-300"}
                            ></div>
                        ))}
                        {Array.from({ length: emptyBars }).map((_, index) => (
                            <div
                                key={`empty-${index}`}
                                className="w-24 h-2 bg-gray-300 rounded-full"
                            ></div>
                        ))}
                    </div>
                    <div>{page}/5</div>
                </div>
            }
                  footer={null}>
            </Card>
            <Card
                className={'mt-4'}
                header={
                    <div className={'flex flex-col'}>
                        <Fieldset legend={'문제'}>
                            <p>{data.data.quiz[page].question}</p>
                        </Fieldset>
                        <div>
                            <ListBox value={userSelection} onChange={(e) => {
                                console.log(e)
                                setSelection(e.value)
                            }} options={data.data.quiz[page].choices}/>
                        </div>
                    </div>
                }
                footer={<QuizFooter quizId={data.data.quiz[page].id} choices={data.data.quiz[page].choices}/>}>
            </Card>
        </div>
    )

}
export default QuizPage