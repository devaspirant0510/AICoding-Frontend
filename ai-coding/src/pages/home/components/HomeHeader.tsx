import CoinStatus from "../../../components/atom/CoinStatus.tsx";
import {Button} from "primereact/button";
import {useNavigate} from "react-router";
import {useCallback} from "react";
import {Link, Navigate} from "react-router-dom";
import useAuthStore from "../../../store/AuthStore.ts";
import {toast} from "react-toastify";
import Gravatar from "react-gravatar";

const HomeHeader = () => {
    const navigate = useNavigate();
    const {user} = useAuthStore();
    const onClickDashboard = useCallback(() => {
        navigate("/dashboard")
    }, [])
    if (!user) {
        return <Navigate to={"/start"}/>
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
            <Link to={"/home"}><h1 className={'text-4xl'}
                                   style={{color: 'var(--cogreen)', fontWeight: 'bold'}}>&lt;AICoding/&gt;</h1></Link>
            <div style={{display: 'flex',}}>
                {/*<CoinStatus/>*/}
                <Button
                    icon={"pi pi-chart-bar"}
                    label={"대시보드"}
                    onClick={onClickDashboard}
                />
                <Link to={"/profile"}>
                    <div className={'bg-cowhite flex items-center px-4 rounded-lg ml-2 py-2'}>
                        <Gravatar className={'rounded-full'} email={user.nickname} size={45}/>
                        <div className={'ml-2'}>{user.nickname}</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default HomeHeader