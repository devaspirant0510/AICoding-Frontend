import { useQuery } from "@tanstack/react-query";
import httpFetcher from "../../lib/httpFetcher.ts";
import { AccountDto } from "../../data/dto/AccountDto.ts";
import { ResponseEntity } from "../../data/ResponseEntity.ts";
import { Card } from "primereact/card";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import { formatDateKor } from "../../lib/dateUtils.ts";
import MyTierText from "../../components/molecule/MyTierText.tsx";
import { Button } from "primereact/button";
import MainLayout from "../../layout/MainLayout.tsx";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/AuthStore.ts";
import Cookies from "js-cookie";
import { Dialog } from "primereact/dialog";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [displayLogoutDialog, setDisplayLogoutDialog] = useState(false); // 다이얼로그 표시 상태
    const { clearUser } = useAuthStore();
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["v1", "account", "token", "access", "verify"],
        queryFn: httpFetcher<ResponseEntity<AccountDto>>,
    });
    const onClickLogout = useCallback(() => {
        setDisplayLogoutDialog(true); // 로그아웃 버튼 클릭 시 다이얼로그 표시
    }, []);
    const onConfirmLogout = () => {
        clearUser();
        Cookies.remove("refreshToken");
        navigate("/start");
        setDisplayLogoutDialog(false); // 로그아웃 후 다이얼로그 닫기
    };

    const onCancelLogout = () => {
        setDisplayLogoutDialog(false); // 취소 시 다이얼로그 닫기
    };

    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    if (!data) {
        toast.error("로그인후 이용가능한 서비스 입니다.");
        return <Navigate to={"/start"} />;
    }

    return (
        <MainLayout>
            <Card header={<div className={"text-start text-3xl p-4 font-extrabold"}>내 프로필</div>}>
                <Divider />
                <div className={"text-2xl text-start font-bold ml-4 mb-4 "}>내정보</div>
                <div className="grid grid-cols-12 gap-4 items-center text-xl mb-2">
                    <div className="col-span-2 text-center font-medium">이름</div>
                    <div className="col-span-10 text-left">{data.data.nickname}</div>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center text-xl mb-2">
                    <div className="col-span-2 text-center font-medium">유저 아이디</div>
                    <div className="col-span-10 text-left">{data.data.userId}</div>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center text-xl mb-2">
                    <div className="col-span-2 text-center font-medium">계정 생성일</div>
                    <div className="col-span-10 text-left">{formatDateKor(data.data.createdAt)}</div>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center text-xl mb-2">
                    <div className="col-span-2 text-center font-medium">내 등급</div>
                    <div className="col-span-10 text-left">
                        <MyTierText exp={data.data.exp} />
                    </div>
                </div>
                <Divider />
                <div className={"p-4"}>
                    <Link to={"/dashboard"}>
                        <Button className={"w-full"} icon={"pi pi-chart-bar"} label={"내 대시보드"} />
                    </Link>
                    <Button
                        onClick={onClickLogout}
                        outlined
                        className={"w-full mt-4"}
                        severity={"danger"}
                        icon={"pi pi-sign-out"}
                        label={"로그아웃"}
                    ></Button>
                </div>
            </Card>

            {/* 로그아웃 확인 다이얼로그 */}
            <Dialog
                header="로그아웃 확인"
                visible={displayLogoutDialog}
                style={{ width: "450px" }}
                footer={
                    <>
                        <Button label="취소" icon="pi pi-times" onClick={onCancelLogout} />
                        <Button label="확인" icon="pi pi-check" onClick={onConfirmLogout} />
                    </>
                }
                onHide={onCancelLogout}
            >
                <p>로그아웃 하시겠습니까?</p>
            </Dialog>
        </MainLayout>
    );
};
export default ProfilePage;
