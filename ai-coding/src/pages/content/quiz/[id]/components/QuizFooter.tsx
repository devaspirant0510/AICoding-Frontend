import {toast} from "react-toastify";
import {FC, useCallback} from "react";
import {useMutation} from "@tanstack/react-query";
import useAuthStore from "../../../../../store/AuthStore.ts";
import useQuizStore from "../../../../../store/QuizStore.ts";
import api from "../../../../../lib/axiosSettings.ts";
import {Button} from "primereact/button";
import {ResponseEntity} from "../../../../../data/ResponseEntity.ts";

interface QuizFooterProps {
    quizId: number;
    choices: string[];
}

const QuizFooter: FC<QuizFooterProps> = ({quizId, choices}) => {
    const {getAccessToken} = useAuthStore();
    const {page, setPage, userSelection, addResult} = useQuizStore();
//#22c55e success
    //ef4444 fail
    const {mutateAsync} = useMutation({
        mutationFn: async (data: { quizId: number; myAnswer: number }) => {
            const {quizId, myAnswer} = data;
            const answer = choices.findIndex((choice) => choice === userSelection) + 1;
            const result = await api.post(
                `v1/quiz/${quizId}/checkAnswer`,
                {myAnswer: answer},
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                }
            );
            return result.data as ResponseEntity<boolean> ;
        },
        onSuccess: (data:ResponseEntity<boolean>) => {
            data.data ? toast.success('정답입니다.') : toast.error('오답입니다.');
            addResult({color: data.data ? "#22c55e" : "#ef4444", value: 20});
        },
    });

    const onClickNextButton = useCallback(async () => {
        await mutateAsync({quizId, myAnswer: Number(userSelection)});
        setPage(page + 1);
    }, [page, quizId, userSelection]);

    return (
        <div className="flex">
            <Button className="bg-cohint">힌트보기</Button>
            {page < 4 ? (
                <Button onClick={onClickNextButton}>다음</Button>
            ) : (
                <Button>확인</Button>
            )}
        </div>
    );
};

export default QuizFooter