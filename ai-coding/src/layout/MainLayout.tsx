import {FC, ReactNode} from "react";
import HomeHeader from "../pages/home/components/HomeHeader.tsx";

type Props = {
    children:ReactNode,
}
const MainLayout:FC<Props> = ({children})=>{
    return (
        <div className={'flex flex-col'}>
            <HomeHeader/>
            {children}
        </div>
    );
}
export default MainLayout;