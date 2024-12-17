import {FC} from "react";
import {ProgressBar} from "primereact/progressbar";

type Props = {
    exp:number
}

const ProfileTier:FC<Props> = ({exp})=>{
    if (exp < 100) {
        return (
            <div>
                <div className={'flex justify-center'}>
                    <img src={"./bronze.png"} width={80} height={80} alt={'bronze Tier'}/>
                </div>
            </div>
        )
    }
    if (exp < 300) {
        return (
            <div>
                <div className={'flex justify-center'}>
                    <img src={"./silver.png"} width={80} height={80} alt={'bronze Tier'}/>
                </div>
            </div>
        )
    }

    return (
        <></>
    )
}
export default ProfileTier;