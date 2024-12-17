import useDialogState from "../../../hooks/useDialogState.ts";
import React, { FC, useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import useInput from "../../../hooks/useInput.ts";
import api from "../../../lib/axiosSettings.ts";
import { ResponseEntity } from "../../../data/ResponseEntity.ts";
import { ResponseLogin } from "../../../data/dto/ResponseLogin.ts";
import { AccountDto } from "../../../data/dto/AccountDto.ts";
import useAuthStore from "../../../store/AuthStore.ts";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

type Props = {
    open: boolean;
    onCloseDialog: () => void;
};

const LoginDialog: FC<Props> = ({ open, onCloseDialog }) => {
    const navigate = useNavigate();
    const [inputId, onChangeId] = useInput('');
    const [inputPwd, onChangePwd] = useInput('');
    const { setAccessToken } = useAuthStore();
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // 오류 상태 추가

    // 유효성 검사 함수
    const validateInputs = () => {
        const newErrors: { [key: string]: string } = {};
        if (!inputId) {
            newErrors.userId = "아이디를 입력해주세요.";
        }
        if (!inputPwd) {
            newErrors.userPwd = "비밀번호를 입력해주세요.";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // 오류가 없으면 true
    };

    const { mutate } = useMutation({
        mutationFn: async (data: { userId: string; userPwd: string }) => {
            const { userId, userPwd } = data;
            const result = await api.post<ResponseEntity<ResponseLogin>>(`v1/account/login`, {
                userId,
                password: userPwd,
            });
            return result.data as ResponseEntity<ResponseLogin>;
        },
        onSuccess: (data: ResponseEntity<ResponseLogin>) => {
            toast.success("로그인 성공");
            setAccessToken(data.data.accessToken);
            Cookies.set('refreshToken', data.data.refreshToken, {
                expires: 30, // 만료일: 1달
                path: '',
            });
            navigate("/home");
        },
        onError: (e: AxiosError<ResponseEntity<unknown>>) => {
            toast.error(e.response?.data?.message || "로그인 실패");
            setLoading(false);  // 에러 발생 시 로딩 상태 해제
        },
    });

    const onClickLoginButton = useCallback(() => {
        if (!validateInputs()) {
            return; // 유효성 검사 실패 시 리턴
        }
        setLoading(true);  // 로그인 버튼 클릭 시 로딩 시작
        mutate({ userId: inputId, userPwd: inputPwd });
    }, [inputId, inputPwd]);

    return (
        <Dialog
            visible={open}
            onHide={onCloseDialog}
            contentStyle={{ background: 'var(--secondary)' }}
            header={<div>로그인</div>}
            headerStyle={{ background: 'var(--secondary)', color: 'white' }}
        >
            <div style={{ background: 'var(--secondary)', width: '500px' }}>
                <FloatLabel>
                    <label htmlFor={"userId"}>아이디</label>
                    <InputText
                        id={'userId'}
                        value={inputId}
                        onChange={onChangeId}
                        className={'w-full my-2'}
                        placeholder={'아이디'}
                    />
                    {errors.userId && <small style={{ color: 'red' }}>{errors.userId}</small>} {/* 아이디 오류 메시지 */}
                </FloatLabel>
                <br />
                <FloatLabel>
                    <InputText
                        id={"password"}
                        value={inputPwd}
                        onChange={onChangePwd}
                        className={'w-full my-2'}
                        placeholder={'비밀번호'}
                        type="password"
                    />
                    <label htmlFor="password">비밀번호</label>
                    {errors.userPwd && <small style={{ color: 'red' }}>{errors.userPwd}</small>} {/* 비밀번호 오류 메시지 */}
                </FloatLabel>
                <br />
                <div style={{ display: 'flex', marginTop: "12px", marginBottom: '12px' }}>
                    <Link to={'/register'}>
                        <span style={{ color: 'var(--coyellow)' }}>
                            계정이 없으신가요? 회원가입
                        </span>
                    </Link>
                </div>
                <Button
                    className={'w-full mt-4'}
                    onClick={onClickLoginButton}
                    icon={'pi pi-sign-in'}
                    label={loading ? "로그인 중..." : "로그인"} // 버튼 텍스트 변경
                    loading={loading} // 로딩 상태 적용
                />
            </div>
        </Dialog>
    );
};

export default LoginDialog;
