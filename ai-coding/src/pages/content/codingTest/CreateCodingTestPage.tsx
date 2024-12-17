import {CascadeSelect} from "primereact/cascadeselect";
import Constants from "../../../utils/Constants.ts";
import {RadioButton} from "primereact/radiobutton";
import React, {useCallback, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {ProgressSpinner} from "primereact/progressspinner";
import useDialogState from "../../../hooks/useDialogState.ts";
import {useMutation} from "@tanstack/react-query";
import api from "../../../lib/axiosSettings.ts";
import {useNavigate} from "react-router";
import AuthStore from "../../../store/AuthStore.ts";
import {Link} from "react-router-dom";
import MainLayout from "../../../layout/MainLayout.tsx";
import {Card} from "primereact/card";
import BackButton from "../../../components/atom/BackButton.tsx";
import {InputTextarea} from "primereact/inputtextarea";

const CreateCodingTestPage = () => {
    const [category, setCategory] = useState("")
    const [radioDifficultly, setRadioDifficultly] = useState("")
    const [open, openDialog, closeDialog] = useDialogState()
    const navigate = useNavigate();
    const {getAccessToken} = AuthStore()
    const [prompt, setPrompt] = useState(""); // 추가 프롬프트 상태
    const maxPromptLength = 1000; // 최대 글자 수

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxPromptLength) {
            setPrompt(e.target.value);
        }
    };
    const {mutate} = useMutation({
        mutationFn: async (data: { category: string, difficultly: string,prompt:string }) => {
            console.log(getAccessToken(), category, radioDifficultly)
            openDialog()
            const result = await api.post("v1/codingTest", {
                category: category,
                difficultly: radioDifficultly,
                prompt:prompt,
            }, {})
            console.log(result.data)
            return result.data.data
        },
        onSuccess: (data) => {
            closeDialog()
            navigate(`/content/codingTest/${data.id}`)

        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onClickGenerateQuiz = useCallback(() => {
        console.log("click generate")
        mutate({category: category, difficultly: radioDifficultly,prompt:prompt})


    }, [category, radioDifficultly])
    return (
        <MainLayout>
            <Card>
                <div className={'w-full h-full flex flex-col rounded-xl p-4 '}>
                    <div className={'flex'}>
                        <BackButton/>
                    </div>
                    <div className={'text-2xl text-start ml-4 mt-4'}>
                        여러분만의 코딩테스트를 만들어보세요
                    </div>
                    <div className={'text-start ml-4'}>
                        원하는 카테고리를 지정하면 수준에 맞는 코딩 테스트를 생성형 AI 가 성생해줍니다.
                    </div>
                    <div className={'grid grid-cols-12 gap-4 mt-4 mb-4 items-center'}>
                        <div className={'col-span-2 text-center font-medium'}>카테고리</div>
                        <div className={'col-span-10 text-left'}>
                            <Dropdown
                                value={category}
                                onChange={(e) => setCategory(e.value)}
                                options={Constants.codingTestCategories}
                                placeholder="카테고리 선택"
                            />
                        </div>
                    </div>
                    <div className={'grid grid-cols-12 gap-4 mb-8 items-center'}>
                        <div className={'col-span-2 text-center font-medium'}>난이도</div>
                        <div className={'col-span-10 flex space-x-4'}>
                            <div className={'flex items-center'}>
                                <RadioButton
                                    id={'easy'}
                                    name={'difficulty'} value={"EASY"} onChange={(e) => setRadioDifficultly(e.value)}
                                    checked={radioDifficultly === "EASY"}/>
                                <label className={'ml-2'} htmlFor={'easy'}>쉬움</label>
                            </div>
                            <div className={'flex items-center'}>
                                <RadioButton
                                    id={'medium'}
                                    name={'difficulty'} value={"MEDIUM"} onChange={(e) => setRadioDifficultly(e.value)}
                                    checked={radioDifficultly === "MEDIUM"}/>
                                <label className={'ml-2'} htmlFor={'medium'}>중간</label>
                            </div>
                            <div className={'flex items-center'}>
                                <RadioButton
                                    id={'hard'}
                                    name={'difficulty'} value={"HARD"} onChange={(e) => setRadioDifficultly(e.value)}
                                    checked={radioDifficultly === "HARD"}/>
                                <label className={'ml-2'} htmlFor={'hard'}>어려움</label>
                            </div>
                        </div>
                    </div>
                    <div className={'grid grid-cols-12 gap-4 mb-8 items-center'}>
                        <div className={'col-span-2 text-center font-medium'}>추가 프롬프트</div>
                        <div className={'col-span-10 mr-4'}>
                            <InputTextarea
                                value={prompt}
                                onChange={handlePromptChange}
                                rows={5}
                                cols={100}
                                autoResize
                                maxLength={1000}
                                className="w-full"
                            />
                            <div className="text-right text-sm text-gray-500">
                                {prompt.length} / {maxPromptLength}자
                            </div>
                        </div>
                    </div>
                    <Button onClick={onClickGenerateQuiz}>생성하기</Button>
                </div>
                <Dialog visible={open} onHide={closeDialog}>
                    <div className={'flex flex-col items-center justify-center'}>
                        <ProgressSpinner/>
                        <div>코딩테스트를 생성하는 중입니다.</div>
                    </div>

                </Dialog>
            </Card>
        </MainLayout>
    )
        ;
}
export default CreateCodingTestPage