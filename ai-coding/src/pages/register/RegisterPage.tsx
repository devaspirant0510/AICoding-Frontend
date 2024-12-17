import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import api from "../../lib/axiosSettings.ts";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import BackButton from "../../components/atom/BackButton.tsx";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({
        nickname: "",
        userId: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);  // 로딩 상태 추가


    // 회원가입 API 호출
    const registerMutation = useMutation({
        mutationFn: async (data: { nickname: string; userId: string; password: string }) => {
            setLoading(true); // 요청 시작 시 로딩 상태 true로 변경
            const response = await api.post("v1/account",{
                userId,
                password,
                nickname
            })
            const result = await response.data
            return result;
        },
        onSuccess: () => {
            setLoading(false);  // 성공 시 로딩 상태 false로 변경
            toast.success("회원가입 성공")
            navigate("/")
        },
        onError: (error) => {
            setLoading(false);  // 실패 시 로딩 상태 false로 변경
            toast.error(error.message)
        },
    });

    const handleBlur = (field: string) => {
        let errors = { ...formErrors };
        let hasError = false;

        if (field === "nickname" && !nickname.trim()) {
            errors.nickname = "닉네임을 입력해주세요.";
            hasError = true;
        } else if (field === "userId" && !userId.trim()) {
            errors.userId = "유저아이디를 입력해주세요.";
            hasError = true;
        } else if (field === "password" && !password) {
            errors.password = "비밀번호를 입력해주세요.";
            hasError = true;
        } else if (field === "confirmPassword" && password !== confirmPassword) {
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
            hasError = true;
        }

        if (hasError) {
            setFormErrors(errors);
        } else {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [field]: "",
            }));
        }
    };

    const handleSubmit = () => {
        let errors = { nickname: "", userId: "", password: "", confirmPassword: "" };
        let hasError = false;

        if (!nickname.trim()) {
            errors.nickname = "닉네임을 입력해주세요.";
            hasError = true;
        }
        if (!userId.trim()) {
            errors.userId = "유저아이디를 입력해주세요.";
            hasError = true;
        }
        if (!password) {
            errors.password = "비밀번호를 입력해주세요.";
            hasError = true;
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
            hasError = true;
        }

        if (hasError) {
            setFormErrors(errors);
            return;
        }

        const userData = { nickname, userId, password };

        registerMutation.mutate(userData);
    };

    return (
        <div
            style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}
        >
            <Card
                header={<div className={'flex justify-start'}><BackButton/></div>}
                className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="p-text-center text-4xl mb-8">회원가입</h2>
                <div className="p-fluid">
                    <div className="p-field text-start mt-8">
                        <FloatLabel>
                            <label htmlFor="nickname">닉네임</label>
                            <div className={"mt-2"}>
                                <InputText
                                    id="nickname"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    onBlur={() => handleBlur("nickname")}
                                    required
                                    autoFocus
                                    className={formErrors.nickname ? "p-invalid" : ""}
                                />
                            </div>
                        </FloatLabel>
                        {formErrors.nickname && <small className="p-error">{formErrors.nickname}</small>}
                    </div>

                    <div className="p-field text-start mt-8">
                        <FloatLabel>
                            <label htmlFor="userId">유저아이디</label>
                            <InputText
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                onBlur={() => handleBlur("userId")}
                                required
                                className={formErrors.userId ? "p-invalid" : ""}
                            />
                        </FloatLabel>
                        {formErrors.userId && <small className="p-error">{formErrors.userId}</small>}
                    </div>

                    {/* 비밀번호 */}
                    <div className="p-field text-start mt-8">
                        <FloatLabel>
                            <Password
                                id="password"
                                value={password}
                                inputId={"password"}
                                toggleMask
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => handleBlur("password")}
                                required
                                feedback={false}
                                className={formErrors.password ? "p-invalid" : ""}
                            />
                            <label htmlFor="password">비밀번호</label>
                        </FloatLabel>
                        {formErrors.password && <small className="p-error">{formErrors.password}</small>}
                    </div>

                    {/* 비밀번호 재확인 */}
                    <div className="p-field text-start mt-8">
                        <FloatLabel>
                            <Password
                                value={confirmPassword}
                                inputId={"confirmPassword"}
                                toggleMask
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() => handleBlur("confirmPassword")}
                                required
                                feedback={false}
                                className={formErrors.confirmPassword ? "p-invalid" : ""}
                            />
                            <label htmlFor="confirmPassword">비밀번호 재확인</label>
                        </FloatLabel>
                        {formErrors.confirmPassword && (
                            <small className="p-error">{formErrors.confirmPassword}</small>
                        )}
                    </div>

                    <div className="p-d-flex p-jc-between p-mt-4 mt-8">
                        <Button
                            label={loading ? "로딩 중..." : "회원가입"}
                            onClick={handleSubmit}
                            loading={loading} // 버튼 로딩 상태 관리
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
