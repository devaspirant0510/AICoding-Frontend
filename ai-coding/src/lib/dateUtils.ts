import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export const formatDateRelativeTime = (date: string) => {
    return dayjs(date).fromNow();
}

export const formatDate = (date:string)=>{
    return dayjs(date).format('YYYY-MM-DD');
}
export const formatDateKor = (date:string)=>{
    return dayjs(date).format('YYYY년 MM월 DD일');
}
