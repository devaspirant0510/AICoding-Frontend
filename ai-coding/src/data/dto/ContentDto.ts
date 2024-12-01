import {AccountDto} from "./AccountDto.ts";
import {QuizDto} from "./QuizDto.ts";

export type ContentDto= {
    id: number;
    createdAt: string; // ISO 날짜 형식
    account: AccountDto;
    studyType: "QUIZ" | "OTHER"; // studyType은 고정된 문자열 값으로 지정
    quiz: QuizDto[];
    category: string; // 카테고리 이름 (예: "Go")
    difficultly: "EASY" | "MEDIUM" | "HARD"; // 난이도는 고정된 값 중 하나
    studyName: string;
}