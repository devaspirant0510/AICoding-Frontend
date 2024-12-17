import { FC } from "react";
import { ProgressBar } from "primereact/progressbar";
import "../style.css";

type Props = {
    exp: number;
};

const MyTier: FC<Props> = ({ exp }) => {
    if (exp < 100) {
        return (
            <div>
                <div className={"text-start my-2 text-lg"}>브론즈</div>
                <ProgressBar
                    color={"var(--cogreen)"}
                    style={{ background: "#44475A", height: "12px" }}
                    value={Number(((exp / 100) * 100).toFixed(2))} // 경험치 비율
                />
                <div>다음 티어까지 필요한 포인트 : {100 - exp}</div>
                <div className={"flex justify-center"}>
                    <img src={"./bronze.png"} width={180} height={180} alt={"bronze Tier"} />
                </div>
            </div>
        );
    }
    if (exp < 300) {
        const remainingExp = exp - 100; // 이전 티어 경험치 차이 계산
        return (
            <div>
                <div className={"text-start my-2 text-lg"}>실버</div>
                <ProgressBar
                    color={"var(--cogreen)"}
                    style={{ background: "#44475A", height: "12px" }}
                    value={Number(((remainingExp / 200) * 100).toFixed(2))} // 경험치 비율
                />
                <div>다음 티어까지 필요한 포인트 : {300 - exp}</div>
                <div className={"flex justify-center"}>
                    <img src={"./silver.png"} width={180} height={180} alt={"silver Tier"} />
                </div>
            </div>
        );
    }
    if (exp < 800) {
        const remainingExp = exp - 300;
        return (
            <div>
                <div className={"text-start my-2 text-lg"}>골드</div>
                <ProgressBar
                    color={"var(--cogreen)"}
                    style={{ background: "#44475A", height: "12px" }}
                    value={Number(((remainingExp / 500) * 100).toFixed(2))}
                />
                <div>다음 티어까지 필요한 포인트 : {800 - exp}</div>
                <div className={"flex justify-center"}>
                    <img src={"./gold.png"} width={180} height={180} alt={"gold Tier"} />
                </div>
            </div>
        );
    }
    if (exp < 1500) {
        const remainingExp = exp - 800;
        return (
            <div>
                <div className={"text-start my-2 text-lg"}>플래티넘</div>
                <ProgressBar
                    color={"var(--cogreen)"}
                    style={{ background: "#44475A", height: "12px" }}
                    value={Number(((remainingExp / 700) * 100).toFixed(2))}
                />
                <div>다음 티어까지 필요한 포인트 : {1500 - exp}</div>
                <div className={"flex justify-center"}>
                    <img src={"./platinum.png"} width={180} height={180} alt={"platinum Tier"} />
                </div>
            </div>
        );
    }
    if (exp < 3000) {
        const remainingExp = exp - 1500;
        return (
            <div>
                <div className={"text-start my-2 text-lg"}>다이아몬드</div>
                <ProgressBar
                    color={"var(--cogreen)"}
                    style={{ background: "#44475A", height: "12px" }}
                    value={Number(((remainingExp / 1500) * 100).toFixed(2))}
                />
                <div>다음 티어까지 필요한 포인트 : {3000 - exp}</div>
                <div className={"flex justify-center"}>
                    <img src={"./diamond.png"} width={180} height={180} alt={"diamond Tier"} />
                </div>
            </div>
        );
    }
    if (exp < 6000) {
        const remainingExp = exp - 3000;
        return (
            <div>
                <div className={"text-start my-2 text-lg"}>마스터</div>
                <ProgressBar
                    color={"var(--cogreen)"}
                    style={{ background: "#44475A", height: "12px" }}
                    value={Number(((remainingExp / 3000) * 100).toFixed(2))}
                />
                <div>다음 티어까지 필요한 포인트 : {6000 - exp}</div>
                <div className={"flex justify-center"}>
                    <img src={"./master.png"} width={180} height={180} alt={"master Tier"} />
                </div>
            </div>
        );
    }
    if (exp < 10000) {
        const remainingExp = exp - 6000;
        return (
            <div>
                <div className={"text-start my-2 text-lg"}>그랜드마스터</div>
                <ProgressBar
                    color={"var(--cogreen)"}
                    style={{ background: "#44475A", height: "12px" }}
                    value={Number(((remainingExp / 4000) * 100).toFixed(2))}
                />
                <div>다음 티어까지 필요한 포인트 : {10000 - exp}</div>
                <div className={"flex justify-center"}>
                    <img src={"./grandMaster.png"} width={180} height={180} alt={"grandmaster Tier"} />
                </div>
            </div>
        );
    }
    const remainingExp = exp - 10000;
    return (
        <div>
            <div className={"text-start my-2 text-lg"}>챌린저</div>
            <ProgressBar
                color={"var(--cogreen)"}
                style={{ background: "#44475A", height: "12px" }}
                value={100} // 챌린저는 최대 티어
            />
            <div>추가 경험치 : {remainingExp}</div>
            <div className={"flex justify-center"}>
                <img src={"./challenger.png"} width={180} height={180} alt={"challenger Tier"} />
            </div>
        </div>
    );
};

export default MyTier;
