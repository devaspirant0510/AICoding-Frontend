// src/store/QuizStore.ts
import {create} from 'zustand';


type QuizResult = {
    label:string,
    color:string,
    value:number
}
type QuizState ={
    page: number;
    userSelection: string;
    userResult: QuizResult[],
    setPage: (page: number) => void;
    setSelection: (selection: string) => void;
    addResult: (result: QuizResult) => void,
    clearState: () => void
}

const useQuizStore = create<QuizState>((set) => ({
    page: 0,
    userSelection: '',
    userResult: [],
    setPage: (page) => set({page}),
    setSelection: (selection) => set({userSelection: selection}),
    addResult: (result) =>
        set((state) => ({userResult: [...state.userResult, {label:result.value?'정답':'오답',...result}]})),
    clearState: () => set({userResult: [], userSelection: '', page: 0}),
}));

export default useQuizStore;