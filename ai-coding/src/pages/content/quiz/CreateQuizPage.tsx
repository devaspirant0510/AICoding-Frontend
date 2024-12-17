import MainLayout from "../../../layout/MainLayout.tsx";
import {InputText} from "primereact/inputtext";
import {MultiSelect} from "primereact/multiselect";
import {Dropdown} from "primereact/dropdown";
import React, {useCallback, useState} from "react";
import Constants from "../../../utils/Constants.ts";
import {CascadeSelect} from "primereact/cascadeselect";
import {RadioButton} from "primereact/radiobutton";
import {Button} from "primereact/button";
import {useMutation} from "@tanstack/react-query";
import api from "../../../lib/axiosSettings.ts";
import useAuthStore from "../../../store/AuthStore.ts";
import {AxiosHeaders, RawAxiosRequestHeaders} from "axios";
import useDialogState from "../../../hooks/useDialogState.ts";
import {Dialog} from "primereact/dialog";
import {ProgressSpinner} from "primereact/progressspinner";
import {useNavigate} from "react-router";
import {InputTextarea} from "primereact/inputtextarea";
import {Card} from "primereact/card";
import BackButton from "../../../components/atom/BackButton.tsx";
import {toast} from "react-toastify";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const CreateQuizPage = () => {
    const [category, setCategory] = useState("")
    const {accessToken} = useAuthStore();
    const [radioDifficultly, setRadioDifficultly] = useState("")
    const [open, openDialog, closeDialog] = useDialogState()
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState(""); // 추가 프롬프트 상태
    const maxPromptLength = 3000; // 최대 글자 수

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxPromptLength) {
            setPrompt(e.target.value);
        }
    };
    const {mutate} = useMutation({
        mutationFn: async (data: { category: string, difficultly: string, prompt: string }) => {

            openDialog()
            const result = await api.post("v1/quiz", {
                category: category,
                difficultly: radioDifficultly,
                prompt:prompt,
            }, {})
            console.log(result.data)
            return result.data.data
        },
        onSuccess: (data) => {
            closeDialog()
            navigate(`/content/quiz/${data.id}`)
        },
        onError:(data)=>{
            closeDialog();
            toast.error(data.data);
        }
    })
    const onClickGenerateQuiz = useCallback(() => {
        mutate({category: category, difficultly: radioDifficultly, prompt: prompt})
    }, [category, radioDifficultly, prompt])


    return (
        <MainLayout>
            <Card>
                <div className=" w-full h-full flex flex-col rounded-xl p-4">
                    <div className="flex">
                        <BackButton/>
                    </div>
                    <div className="text-2xl text-start mt-4 ml-4">
                        여러분만의 퀴즈를 만들어보세요
                    </div>
                    <div className="text-start ml-4">
                        원하는 카테고리를 지정하여 수준에 맞는 퀴즈를 생성형 AI가 생성해줍니다.
                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-4 mb-4 items-center">
                        <div className="col-span-2 text-center font-medium">카테고리</div>
                        <div className="col-span-10 text-left">
                            <CascadeSelect
                                value={category}
                                onChange={(e) => setCategory(e.value.name)}
                                options={Constants.quizCategory}
                                optionLabel="name"
                                optionGroupLabel="cname"
                                optionGroupChildren={['items']} // 'items'를 하위 카테고리로 설정
                                placeholder="카테고리 선택"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mb-8 items-center">
                        <div className="col-span-2 text-center font-medium">난이도</div>
                        <div className="col-span-10 flex space-x-4">
                            <div className="flex items-center">
                                <RadioButton
                                    id="easy"
                                    name="difficulty"
                                    value="EASY"
                                    onChange={(e) => setRadioDifficultly(e.value)}
                                    checked={radioDifficultly === "EASY"}
                                />
                                <label htmlFor="easy" className="ml-2">
                                    쉬움
                                </label>
                            </div>
                            <div className="flex items-center">
                                <RadioButton
                                    id="medium"
                                    name="difficulty"
                                    value="MEDIUM"
                                    onChange={(e) => setRadioDifficultly(e.value)}
                                    checked={radioDifficultly === "MEDIUM"}
                                />
                                <label htmlFor="medium" className="ml-2">
                                    중간
                                </label>
                            </div>
                            <div className="flex items-center">
                                <RadioButton
                                    id="hard"
                                    name="difficulty"
                                    value="HARD"
                                    onChange={(e) => setRadioDifficultly(e.value)}
                                    checked={radioDifficultly === "HARD"}
                                />
                                <label htmlFor="hard" className="ml-2">
                                    어려움
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mb-8 items-start">
                        <div className="col-span-2 text-center font-medium">추가 프롬프트</div>
                        <div className="col-span-10 mr-4">
                            <InputTextarea
                                value={prompt}
                                onChange={handlePromptChange}
                                rows={5}
                                cols={100}
                                autoResize
                                maxLength={3000}
                                className="w-full"
                            />
                            <div className="text-right text-sm text-gray-500">
                                {prompt.length} / {maxPromptLength}자
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button className={'w-full'} onClick={onClickGenerateQuiz}>생성하기</Button>
                    </div>
                    <Dialog visible={open} onHide={closeDialog}>
                        <div className="flex flex-col items-center justify-center">
                            <ProgressSpinner/>
                            <div>퀴즈를 생성하는 중입니다.</div>
                        </div>
                    </Dialog>
                </div>
            </Card>
        </MainLayout>
    );

}
export default CreateQuizPage;