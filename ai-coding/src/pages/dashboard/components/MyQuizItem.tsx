import {ContentDto} from "../../../data/dto/ContentDto.ts";
import {FC} from "react";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Link} from "react-router-dom";
import {formatDateRelativeTime} from "../../../lib/dateUtils.ts";
import {Chip} from "primereact/chip";

type Props = {
    item: ContentDto
}
const MyQuizItem: FC<Props> = ({item}) => {
    console.log(item)
    return (
        <div>
            <div className={'p-1'}>
                <Link
                    to={`/content/${item.studyType === "QUIZ" ? "quiz" : item.studyType === "CODE_REVIEW" ? "codeReview" : "codingTest"}/${item.id}`}>
                    <div className={'p-2 ml-2'}>
                        <div className={'flex justify-between mb-1'}>
                            <div>
                                <span className={'text-xl'}>{item.studyName}</span>
                                {item.studyType !== "CODE_REVIEW" &&
                                    <span className={'text-sm text-gray-400'}>({item.difficultly})</span>
                                }
                            </div>
                            <div>{formatDateRelativeTime(item.createdAt)}</div>
                        </div>
                        <div className={'flex justify-start'}>
                            <Chip  label={item.category}/>
                        </div>
                    </div>
                </Link>

            </div>
            <Divider/>
        </div>
    )
}
export default MyQuizItem;