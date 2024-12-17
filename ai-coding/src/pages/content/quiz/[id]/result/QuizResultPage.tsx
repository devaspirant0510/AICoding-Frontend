import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Panel} from "primereact/panel";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router";
import httpFetcher from "../../../../../lib/httpFetcher.ts";
import useQuizStore from "../../../../../store/QuizStore.ts";
import {ResponseEntity} from "../../../../../data/ResponseEntity.ts";
import {ContentDto} from "../../../../../data/dto/ContentDto.ts";
import {Link, Navigate} from "react-router-dom";
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import ReactMarkdown from 'react-markdown'
import Markdown from "react-markdown";
import {Fieldset} from "primereact/fieldset";

const QuizResultPage = () => {
    const {id} = useParams();
    const {userResult, quizFeedback} = useQuizStore();
    console.log(userResult)
    const {isLoading, data} = useQuery({
        queryKey: ["v1", "content", id],
        queryFn: httpFetcher<ResponseEntity<ContentDto>>,
    });
    if(!userResult || userResult.length<5){
        return <Navigate to={"/home"}></Navigate>
    }

    if (isLoading) {
        return <>loading</>;
    }

    if (!data || !data.data) {
        return <>nodata</>;
    }

    return (
        <Card
            header={
                <div>
                    <div className={'text-4xl p-4 font-bold'}>퀴즈 결과</div>
                    <div className={'pb-2'}>
                        5문제 중
                        {userResult.reduce(
                            (acc, curr) => acc + (curr.label === "정답" ? 1 : 0),
                            0
                        )}
                        개 정답
                    </div>
                </div>
            }
            footer={
                <div className={'flex mt-4 px-2 pb-2'}>
                    <Link to={"/content/quiz"} className={'flex-1 mr-2'}>
                        <Button className={'w-full flex-1'} severity={'help'} label={"다른 퀴즈 생성하기"} icon={'pi pi-book'}/>
                    </Link>
                    <Link to={"/home"} className={'flex-1 ml-2'}>
                        <Button className={'w-full flex-1'} label={"돌아가기"} icon={'pi pi-home'}/>
                    </Link>
                </div>
            }
        >
            <Panel className={'text-start m-4'} header={
                <div className={'flex items-center'}>
                    <i className={'pi pi-microchip-ai mr-4'} style={{fontSize: '2rem'}}/>
                    <div className={' text-xl'}>AI 의 코멘트</div>
                </div>
            }>
                <Markdown className={'text-start'}>
                    {quizFeedback}
                </Markdown>
            </Panel>
            <div className={'m-4'}>

                {data.data.quiz.map((quizItem, quizIdx) => (
                    <Accordion key={quizIdx}>
                        <AccordionTab
                            header={
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <i
                                        className={`pi ${
                                            userResult[quizIdx].label === "정답" ? "pi-check-circle" : "pi-times-circle"
                                        }`}
                                        style={{
                                            marginRight: "8px",
                                            color: userResult[quizIdx].label === "정답" ? "#22c55e" : "#ef4444",
                                        }}
                                    />
                                    {quizIdx + 1}번 문제 - {userResult[quizIdx].label}
                                </div>
                            }
                        >
                            <>
                                <div className={"text-lg mb-4"}>문제 : {quizItem.question}</div>
                                <div>
                                    {quizItem.choices.map((choice, choiceIdx) => {
                                        const isWrongChoice =
                                            userResult[quizIdx].label === "오답" &&
                                            choiceIdx === userResult[quizIdx].select;

                                        const isCorrectAnswer = choiceIdx === quizItem.answer - 1;

                                        return (
                                            <Card
                                                className={"mb-2 p-4"}
                                                key={choiceIdx}
                                                style={{
                                                    background: isWrongChoice
                                                        ? "#ef444460"
                                                        : isCorrectAnswer
                                                            ? "#22c55e60"
                                                            : undefined,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: isWrongChoice
                                                            ? "#ef4444"
                                                            : isCorrectAnswer
                                                                ? "#22c55e"
                                                                : undefined,
                                                    }}
                                                >
                                                    <i
                                                        className={`pi ${
                                                            isWrongChoice
                                                                ? "pi-times"
                                                                : isCorrectAnswer
                                                                    ? "pi-check"
                                                                    : ""
                                                        }`}
                                                        style={{
                                                            marginRight: "8px",
                                                        }}
                                                    />
                                                    {choice}
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                                <Panel
                                    header={
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <i
                                                className="pi pi-lightbulb"
                                                style={{
                                                    marginRight: "8px",
                                                    color: "#ffc107",
                                                }}
                                            />
                                            해설
                                        </div>
                                    }
                                >
                                    {quizItem.explanation}
                                </Panel>
                            </>
                        </AccordionTab>
                    </Accordion>
                ))}
            </div>
        </Card>
    );
};

export default QuizResultPage;
