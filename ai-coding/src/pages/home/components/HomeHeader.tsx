import CoinStatus from "../../../components/atom/CoinStatus.tsx";
import {Button} from "@headlessui/react";

const HomeHeader = ()=>{
    return (
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'30px'}}>
            <h1 className={'text-4xl'} style={{color: 'var(--cogreen)',fontWeight:'bold'}}>&lt;AICoding/&gt;</h1>
            <div style={{display:'flex', }}>
                <CoinStatus/>
                <Button style={{color:'black', background:'#8BE9FD', paddingLeft:'8px',paddingRight:'8px',marginLeft:'10px'}}> 대시보드</Button>

            </div>

        </div>
    )
}
export default HomeHeader