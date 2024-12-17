import { FC } from "react";

type Props = {
    exp: number;
};

const MyTierText: FC<Props> = ({ exp }) => {
    if (exp < 100) {
        return (
            <div className="flex items-center">
                <img src={"./bronze.png"} width={30} />
                브론즈 ({exp}/100)
            </div>
        );
    }
    if (exp < 300) {
        const remainingExp = exp - 100; // 이전 티어와의 경험치 차이 계산
        return (
            <div className="flex items-center">
                <img src={"./silver.png"} width={30} />
                실버 ({remainingExp}/200) {/* 300-100 */}
            </div>
        );
    }
    if (exp < 800) {
        const remainingExp = exp - 300; // 이전 티어와의 경험치 차이 계산
        return (
            <div className="flex items-center">
                <img src={"./gold.png"} width={30} />
                골드 ({remainingExp}/500) {/* 800-300 */}
            </div>
        );
    }
    if (exp < 1500) {
        const remainingExp = exp - 800; // 이전 티어와의 경험치 차이 계산
        return (
            <div className="flex items-center">
                <img src={"./platinum.png"} width={30} />
                플래티넘 ({remainingExp}/700) {/* 1500-800 */}
            </div>
        );
    }
    if (exp < 3000) {
        const remainingExp = exp - 1500; // 이전 티어와의 경험치 차이 계산
        return (
            <div className="flex items-center">
                <img src={"./diamond.png"} width={30} />
                다이아몬드 ({remainingExp}/1500) {/* 3000-1500 */}
            </div>
        );
    }
    if (exp < 6000) {
        const remainingExp = exp - 3000; // 이전 티어와의 경험치 차이 계산
        return (
            <div className="flex items-center">
                <img src={"./master.png"} width={30} />
                마스터 ({remainingExp}/3000) {/* 6000-3000 */}
            </div>
        );
    }
    if (exp < 10000) {
        const remainingExp = exp - 6000; // 이전 티어와의 경험치 차이 계산
        return (
            <div className="flex items-center">
                <img src={"./grandMaster.png"} width={30} />
                그랜드마스터 ({remainingExp}/4000) {/* 10000-6000 */}
            </div>
        );
    }
    const remainingExp = exp - 10000; // 이전 티어와의 경험치 차이 계산
    return (
        <div className="flex items-center">
            <img src={"./challenger.png"} width={30} />
            챌린저 ({remainingExp}/10000+) {/* 10000+ */}
        </div>
    );
};

export default MyTierText;
