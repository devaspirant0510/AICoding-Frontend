import { create } from "zustand";
import { AccountDto } from "../data/dto/AccountDto.ts";
import { ResponseEntity } from "../data/ResponseEntity.ts";
import api from "../lib/axiosSettings.ts";

interface AuthState {
    user: AccountDto | null;
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    getAccessToken: () => string | null;
    reGenAccessToken:()=>Promise<string>;
    getUser: () => Promise<AccountDto | null>;
    clearUser:()=>void;
}

const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    accessToken: null,
    reGenAccessToken:async ()=>{
        const data  = await api.post<string>(
            "/v1/account/token/access/issue",
        );
        console.log("refen",data.data.data.accessToken)
        const accessToken = data.data.data.accessToken;
        set({ accessToken });
    },

    // 액세스 토큰 저장
    setAccessToken: (token) => set({ accessToken: token }),

    // 액세스 토큰 반환
    getAccessToken: () => get().accessToken,

    // 유저 정보 가져오기
    getUser: async () => {
        let accessToken = get().accessToken;

        try {
            // 2️⃣ 유저 정보 가져오기
            const data = await api.get<ResponseEntity<AccountDto>>(
                "/v1/account/token/access/verify",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            console.log("store get user",data.data)
            // 상태 업데이트
            set({ user: data.data.data });

            return data.data.data;
        } catch (error) {
            console.error("유저 정보를 가져오는 데 실패했습니다:", error);
            return null;
        }
    },
    clearUser:()=>{
        set({ user: null,accessToken: null });
    }
}));

export default useAuthStore;
