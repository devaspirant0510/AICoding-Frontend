export type QuizDto = {
    id: number;
    question: string;
    answer: number;
    choices: string[];
    explanation: string;
}