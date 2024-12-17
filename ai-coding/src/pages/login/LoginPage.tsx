import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import BackButton from "../../components/atom/BackButton.tsx";
import api from "../../lib/axiosSettings.ts";
import {toast} from "react-toastify";
import {ResponseEntity} from "../../data/ResponseEntity.ts";
import {ResponseLogin} from "../../data/dto/ResponseLogin.ts";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({
        userId: "",
        password: "",
    });
    const [loading, setLoading] = useState(false); // 로딩 상태 추가


    // 로그인 API 호출 예시
    const loginMutation = useMutation({
        mutationFn: async (data: { userId: string; password: string }) => {
            setLoading(true); // 요청 시작 시 로딩 상태 true로 변경
            const result = await api.post<ResponseEntity<ResponseLogin>>(`v1/account/login`, {
                userId:data.userId,
                password: data.password,
            });
            console.log(result)
            return result.data as ResponseEntity<ResponseLogin>;
        },
        onSuccess: () => {
            setLoading(false);  // 성공 시 로딩 상태 false로 변경
            toast.success("로그인 성공")
        },
        onError: (error) => {
            console.log("ero",error)
            setLoading(false);  // 실패 시 로딩 상태 false로 변경

            toast.error(`로그인 실패 :${error}`)
        },
    });

    const handleBlur = (field: string) => {
        let errors = { ...formErrors };
        let hasError = false;

        if (field === "userId" && !userId.trim()) {
            errors.userId = "아이디를 입력해주세요.";
            hasError = true;
        } else if (field === "password" && !password) {
            errors.password = "비밀번호를 입력해주세요.";
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
        let errors = { userId: "", password: "" };
        let hasError = false;

        if (!userId.trim()) {
            errors.userId = "아이디를 입력해주세요.";
            hasError = true;
        }
        if (!password) {
            errors.password = "비밀번호를 입력해주세요.";
            hasError = true;
        }

        if (hasError) {
            setFormErrors(errors);
            return;
        }

        const userData = { userId, password };

        loginMutation.mutate(userData);
    };

    return (
        <div
            style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}
        >
            <Card header={<div className={'flex justify-start'}><BackButton/></div>} className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <Toast ref={toast} />
                <h2 className="p-text-center text-4xl mb-8">로그인</h2>
                <div className="p-fluid">
                    {/* 유저아이디 입력 */}
                    <div className="p-field text-start mt-8">
                        <FloatLabel>
                            <label htmlFor="userId">아이디</label>
                            <InputText
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                onBlur={() => handleBlur("userId")}
                                required
                                autoFocus
                                className={formErrors.userId ? "p-invalid" : ""}
                            />
                        </FloatLabel>
                        {formErrors.userId && <small className="p-error">{formErrors.userId}</small>}
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="p-field text-start mt-8">
                        <FloatLabel>
                            <Password
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

                    {/* 로그인 버튼 */}
                    <div className="p-d-flex p-jc-between p-mt-4 mt-8">
                        <Button
                            label={loading ? "로딩 중..." : "로그인"}
                            onClick={handleSubmit}
                            loading={loading} // 버튼 로딩 상태 관리
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
