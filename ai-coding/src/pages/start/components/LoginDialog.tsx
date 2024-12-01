import useDialogState from "../../../hooks/useDialogState.ts";
import React, {FC, useCallback} from "react";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import useInput from "../../../hooks/useInput.ts";
import api from "../../../lib/axiosSettings.ts";
import {ResponseEntity} from "../../../data/ResponseEntity.ts";
import {ResponseLogin} from "../../../data/dto/ResponseLogin.ts";
import {AccountDto} from "../../../data/dto/AccountDto.ts";
import useAuthStore from "../../../store/AuthStore.ts";
import {useNavigate} from "react-router";
import Cookies from 'js-cookie';
type Props = {
    open: boolean,
    onCloseDialog: () => void
}
const LoginDialog: FC<Props> = ({open, onCloseDialog}) => {
    const navigate = useNavigate();
    const [inputId,onChangeId] = useInput('')
    const [inputPwd,onChangePwd] = useInput('')
    const {setAccessToken} = useAuthStore()
    const {mutate} = useMutation({
        mutationFn: async (data: { userId: string, userPwd: string }) => {
            const {userId, userPwd} = data;
            const result = await api.post<ResponseEntity<ResponseLogin>>(`v1/account/login`, {
                userId,
                password:userPwd
            })
            return result.data as ResponseEntity<ResponseLogin>
        },
        onSuccess: (data:ResponseEntity<ResponseLogin>) => {
            toast.success("로그인 성공")
            // 로그인 성공시 액세스 토큰은 상태관리에 저장
            setAccessToken(data.data.accessToken);
            // 리프레시 토큰은 쿠키에 저장
            Cookies.set('refreshToken', data.data.refreshToken, {
                expires: 30, // 만료일: 1달
                // secure: true, // HTTPS 연결에서만 사용
                // sameSite: 'Strict', // SameSite 정책 설정
                path: '', // 경로 설정
            });
            navigate("/home");
        },
        onError: (e:AxiosError<ResponseEntity<unknown>>) => {
            console.log(e)
            toast.error(e.response.data.message)
        }
    })
    const onClickLoginButton = useCallback(() => {
        mutate({userId: inputId, userPwd: inputPwd})

    }, [inputId,inputPwd])

    return (
        <Dialog visible={open} onHide={onCloseDialog}
                contentStyle={{background: 'var(--secondary)'}}
                header={<div>로그인</div>}
                headerStyle={{background: 'var(--secondary)', color: 'white'}}
        >
            <div style={{background: 'var(--secondary)'}}>
                <InputText value={inputId} onChange={onChangeId} className={'w-full'}  placeholder={'아이디'}/><br/>
                <InputText value={inputPwd} onChange={onChangePwd} className={'w-full'} placeholder={'비밀번호'}/><br/>
                <div style={{display: 'flex', marginTop: "12px", marginBottom: '12px'}}>
                        <span style={{color: 'var(--coyellow)', marginRight: '10px'}}>
                            아이디/비밀번호를 잊으셨나요?
                        </span>
                    <span style={{color: 'var(--coyellow)', marginLeft: '10px'}}>
                            계정이 없으신가요? 회원가입
                        </span>
                </div>
                <Button onClick={onClickLoginButton} fullWidth style={{background: 'var(--cogreen)'}}>
                    로그인
                </Button>
            </div>

        </Dialog>
    );
}
export default LoginDialog