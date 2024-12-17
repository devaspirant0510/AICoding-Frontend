import {toast} from "react-toastify";
import {FC, useCallback, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import useAuthStore from "../../../../../store/AuthStore.ts";
import useQuizStore from "../../../../../store/QuizStore.ts";
import api from "../../../../../lib/axiosSettings.ts";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog"; // Dialog 컴포넌트 추가
import {ProgressSpinner} from "primereact/progressspinner"; // ProgressSpinner 추가
import {ResponseEntity} from "../../../../../data/ResponseEntity.ts";
import {useNavigate} from "react-router";

interface QuizFooterProps {
    contentId: number,
    quizId: number;
    choices: string[];
}

const QuizFooter: FC<QuizFooterProps> = ({contentId, quizId, choices}) => {
    const {getAccessToken} = useAuthStore();
    const {page, setPage, userSelection, addResult, userResult, setQuizFeedback} = useQuizStore();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); // 로딩 상태 관리

    const {mutateAsync} = useMutation({
        mutationFn: async (data: { quizId: number; myAnswer: number }) => {
            const {quizId, myAnswer} = data;
            const answer = choices.findIndex((choice) => choice === userSelection) + 1;
            const result = await api.post(
                `v1/quiz/${quizId}/checkAnswer`,
                {myAnswer: answer},
                {}
            );
            return result.data as ResponseEntity<boolean>;
        },
        onSuccess: (data: ResponseEntity<boolean>) => {
            data.data ? toast.success('정답입니다.') : toast.error('오답입니다.');
            addResult({
                quizId: quizId,
                label: data.data ? '정답' : '오답',
                select: choices.findIndex((choice) => choice === userSelection),
                color: data.data ? "#22c55e" : "#ef4444",
                value: 20,
            });
        },
    });

    const {mutateAsync: mutateFeedback} = useMutation({
        mutationFn: async () => {
            const result = await api.post(
                "v1/quiz/result/feedback",
                {
                    data: userResult
                }
            )
            return result.data.data

        },
        onSuccess: (data: string) => {
            setQuizFeedback(data)
        }
    });

    const onClickNextButton = useCallback(async () => {
        try {
            await mutateAsync({quizId, myAnswer: Number(userSelection)});
            setPage(page + 1);
        }catch (e){
            toast.error(e.message)
        }
    }, [page, quizId, userSelection]);

    const onClickConfirmButton = useCallback(async () => {
        setLoading(true); // 로딩 시작
        try {
            await mutateAsync({quizId, myAnswer: Number(userSelection)});
            await mutateFeedback();
            navigate(`/content/quiz/${contentId}/result`);
        } finally {
            setLoading(false); // 로딩 종료
        }
    }, [page, quizId, userSelection]);

    return (
        <div className="flex justify-end p-2">
            {page < 4 ? (
                <Button onClick={onClickNextButton}>다음</Button>
            ) : (
                <Button onClick={onClickConfirmButton}>확인</Button>
            )}

            {/* 로딩 다이얼로그 */}
            <Dialog visible={loading} closable={false} modal className="w-1/4">
                <div className="flex justify-center items-center p-4 flex-col">
                    <ProgressSpinner />
                    <span className="ml-4 text-lg">처리 중입니다...</span>
                </div>
            </Dialog>
        </div>
    );
};

export default QuizFooter;
