import MainLayout from "../../../layout/MainLayout.tsx";
import {InputText} from "primereact/inputtext";
import {MultiSelect} from "primereact/multiselect";
import {Dropdown} from "primereact/dropdown";
import {useCallback, useState} from "react";
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const CreateQuizPage = () => {
    const [category, setCategory] = useState("")
    const {accessToken} = useAuthStore();
    const [radioDifficultly, setRadioDifficultly] = useState("")
    const [open, openDialog, closeDialog] = useDialogState()
    const navigate = useNavigate();
    const {mutate} = useMutation({
        mutationFn: async (data: { category: string, difficultly: string }) => {

            openDialog()
            const result = await api.post("v1/quiz", {
                category: category,
                difficultly: radioDifficultly,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            console.log(result.data)
            return result.data.data
        },
        onSuccess: (data) => {
            closeDialog()
            navigate(`/content/quiz/${data.id}`)

        }
    })
    const onClickGenerateQuiz = useCallback(() => {
        mutate({category: category, difficultly: radioDifficultly})


    }, [category, radioDifficultly])

    return (
        <MainLayout>
            <div style={{background: 'var(--third)'}} className={'bg-third w-full h-full flex flex-col rounded-xl p-4'}>
                <div className={'flex'}><i className={'justify-start pi pi-angle-left text-2xl'}></i></div>
                <div className={'text-2xl text-start m-4 ml-4'}>여러분만의 퀴즈를 만들어보세요</div>
                <div className={'text-start ml-4'}>원하는 카테고리를 지정하 수준에 맞는 퀴즈를 생성형 AI 가 성생해줍니다.</div>
                <div className={'flex'}>
                    <div>카테고리</div>
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
                <div className={'flex'}>
                    <div>난이도</div>
                    <div className={'flex'}><RadioButton
                        id={'easy'}
                        name={'difficulty'} value={"EASY"} onChange={(e) => setRadioDifficultly(e.value)}
                        checked={radioDifficultly === "EASY"}/>
                        <label htmlFor={'easy'}>쉬움</label>
                        <RadioButton
                            id={'medium'}
                            name={'difficulty'} value={"MEDIUM"} onChange={(e) => setRadioDifficultly(e.value)}
                            checked={radioDifficultly === "MEDIUM"}/>
                        <label htmlFor={'medium'}>중간</label>
                        <RadioButton
                            id={'hard'}
                            name={'difficulty'} value={"HARD"} onChange={(e) => setRadioDifficultly(e.value)}
                            checked={radioDifficultly === "HARD"}/>
                        <label htmlFor={'hard'}>어려움</label>
                    </div>
                </div>
                <Button onClick={onClickGenerateQuiz}>생성하기</Button>
                <Dialog visible={open} onHide={closeDialog}>
                    <div className={'flex flex-col items-center justify-center'}>
                        <ProgressSpinner/>
                        <div>퀴즈를 생성하는 중입니다.</div>
                    </div>

                </Dialog>
            </div>
        </MainLayout>
    )
}
export default CreateQuizPage;