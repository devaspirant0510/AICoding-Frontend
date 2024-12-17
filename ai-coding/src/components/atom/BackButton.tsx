import React, {useCallback} from "react";
import {useNavigate} from "react-router";

const BackButton = ()=>{
    const navigate = useNavigate();
    const onClickBackButton = useCallback(()=>{
        navigate(-1);
    },[]);
    return (
        <div onClick={onClickBackButton}>
            <i className="justify-start pi pi-angle-left text-2xl my-4"></i>
        </div>
    )
}
export default BackButton;