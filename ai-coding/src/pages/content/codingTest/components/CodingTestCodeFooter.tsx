import {Button} from "primereact/button";
import {FC, useState} from "react";
import {Dialog} from "primereact/dialog";
import {ProgressBar} from "primereact/progressbar";
import useDialogState from "../../../../hooks/useDialogState.ts";
import {useMutation} from "@tanstack/react-query";
import api from "../../../../lib/axiosSettings.ts";
import {useParams} from "react-router";
import AuthStore from "../../../../store/AuthStore.ts";
import {Link} from "react-router-dom";

type Props = {
    hint: string,
    code: string,
    language: string
}

const CodingTestCodeFooter: FC<Props> = ({hint, code, language}) => {
    const {id} = useParams();
    const [hide, onOpen, onClose] = useDialogState();
    const {getAccessToken} = AuthStore();

    // 로딩 상태와 채점 결과 상태 추가
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false); // 다이얼로그 제어용 상태

    const {mutate} = useMutation({
        mutationFn: async () => {
            setIsLoading(true); // 요청 시작 시 로딩 시작
            setResult(null); // 이전 결과 초기화

            console.log(getAccessToken());
            console.log(code, language);
            try {
                const result = await api.post(
                    `v1/codingTest/${id}/evaluate`,
                    {
                        code: code,
                        accountId: 1,
                        language: language
                    },
                    {}
                );

                console.log(result.data);
                setResult(result.data.message);
            } catch (error) {
                console.error(error);
                setResult("채점 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false); // 요청 완료 후 로딩 종료
            }
        },
        onSuccess: async () => {
            console.log("정답 포인트 업데이트")
            const result = await api.patch("v1/account/exp", {
                exp: 30
            });
            console.log(result)
        }
    });

    const handleDialogClose = () => {
        setShowDialog(false); // 다이얼로그 닫기
        setResult(null)
    };

    const handleDialogOpen = () => {
        setShowDialog(true); // 다이얼로그 열기
    };

    return (
        <div className={'text-right flex justify-between'}>
            <Button onClick={handleDialogOpen} severity={'warning'} icon={'pi pi-lightbulb'}>힌트보기</Button>
            <Button severity={'success'} onClick={() => mutate()}>제출</Button>

            <Dialog visible={showDialog} header={"힌트"} onHide={handleDialogClose}>
                <div style={{width:'600px'}}>
                    {hint}
                </div>
            </Dialog>

            <Dialog visible={isLoading || result !== null} header={isLoading ? "채점 진행 중" : "채점 완료"}
                    onHide={handleDialogClose}>
                <div className="flex justify-center align-items-center" style={{width: "300px", height: '200px'}}>
                    {isLoading ? (
                        <div>
                            <ProgressBar mode="indeterminate" style={{width: '100%'}}/>
                            <p className="text-center">채점 중입니다...</p>
                        </div>
                    ) : result === "정답" ? <div>
                        <div>🎉축하합니다 정답입니다.🎉</div>
                        <div className={'text-center my-4'}>
                            <span className={'text-cogreen text-3xl'}>+30</span>exp
                        </div>
                        <Link to={'/'}><Button className={'w-full'} icon={"pi pi-home"}
                                               label={"홈으로"}/></Link>

                    </div> : (
                        <div className={'flex flex-col items-center w-full'}>
                            <p className="text-center text-red-500 my-2">{result}</p>
                            <div className={'flex w-full'}>
                                <div className={'flex-1'}>
                                    <Button onClick={handleDialogClose} className={'w-full'} severity={'warning'}
                                            label={'다시하기'} icon={"pi pi-refresh"}/>
                                </div>
                                <div className={'flex-1'}>
                                    <Link to={'/'}><Button className={'w-full'} icon={"pi pi-home"}
                                                           label={"홈으로"}/></Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default CodingTestCodeFooter;
