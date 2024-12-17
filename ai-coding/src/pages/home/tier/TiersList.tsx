import React from 'react';
import { Card } from "primereact/card";
import BackButton from "../../../components/atom/BackButton.tsx";

const TiersList = () => {
    const tiers = [
        { name: '브론즈', image: '../bronze.png', requiredPoints: '0~99' },
        { name: '실버', image: '../silver.png', requiredPoints: '100~299' },
        { name: '골드', image: '../gold.png', requiredPoints: '300~799' },
        { name: '플래티넘', image: '../platinum.png', requiredPoints: '800~1499' },
        { name: '다이아몬드', image: '../diamond.png', requiredPoints: '1500~2999' },
        { name: '마스터', image: '../master.png', requiredPoints: '3000~5999' },
        { name: '그랜드마스터', image: '../grandMaster.png', requiredPoints: '6000~9999' },
        { name: '챌린저', image: '../challenger.png', requiredPoints: '10000+' }
    ];

    return (
        <Card header={<div className="text-start w-full m-4 pt-4"><BackButton /></div>}>
            <div className="p-4 w-full">
                <h2 className="text-2xl font-bold mb-4 text-start">티어 목록</h2>
                {tiers.map((tier) => (
                    <div
                        key={tier.name}
                        className="flex items-center w-full bg-gray-100 rounded-lg shadow-md p-4 hover:bg-gray-200 transition-colors text-center mb-4"
                    >
                        <img
                            src={tier.image}
                            alt={`${tier.name} 티어`}
                            className="w-24 h-24 object-contain mr-4" // 이미지 크기와 간격 조정
                        />
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold">{tier.name}</div>
                            <div className="text-sm text-gray-600">필요 점수: {tier.requiredPoints}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TiersList;
