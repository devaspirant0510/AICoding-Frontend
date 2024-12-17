import {useNavigate} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import useDialogState from "../../hooks/useDialogState.ts";
import LoginDialog from "./components/LoginDialog.tsx";
import {Button} from 'primereact/button';
import useAuthStore from "../../store/AuthStore.ts";
import {Link, Navigate} from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();
    const [open, openDialog, onCloseDialog, setOpen] = useDialogState()
    const [inputId, setInputId] = useState("")
    const [inputPwd, setInputPwd] = useState("")
    const {user,getUser} = useAuthStore();
    useEffect(() => {
        getUser().then(r=>{

        });


    }, [])

    const onClickLogin = useCallback(() => {
        setOpen(true)
    }, [inputId, inputPwd])
    if (user) {
        return <Navigate to={"/home"}/>
    }

    return (
        <div style={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <h1 style={{color: 'var(--cogreen)', fontSize: '100px'}}>&lt;AICoding/&gt;</h1>
            <div style={{color: 'var(--copink)', fontSize: '20px', marginBottom: '260px'}}>AI Coding에 오신걸 환영합니다.</div>
            <Button onClick={onClickLogin} className={'bg-copink px-10'}>로그인</Button>
            <LoginDialog open={open} onCloseDialog={onCloseDialog}/>
            <Link to={"/register"}>
                <div style={{color: 'var(--coyellow)', marginTop: '12px'}}>계정이 없으신가요 회원가입</div>
            </Link>
        </div>
    )
}
export default StartPage