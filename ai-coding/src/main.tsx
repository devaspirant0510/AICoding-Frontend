import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/global.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import StartPage from "./pages/start/StartPage.tsx";
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginPage from "./pages/login/LoginPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {PrimeReactProvider, PrimeReactContext} from 'primereact/api';
import "primeicons/primeicons.css";

import {Button} from "primereact/button";
import CreateQuizPage from "./pages/content/quiz/CreateQuizPage.tsx";
import CreateCodingTestPage from "./pages/content/codingTest/CreateCodingTestPage.tsx";
import QuizPage from "./pages/content/quiz/[id]/QuizPage.tsx";
import QuizResultPage from "./pages/content/quiz/[id]/result/QuizResultPage.tsx";
import CodingTestPage from "./pages/content/codingTest/[id]/CodingTestPage.tsx";
import CreateCodeReviewPage from "./pages/content/codeReview/CreateCodeReviewPage.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import CodeReviewPage from "./pages/content/codeReview/[id]/CodeReviewPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import TiersList from "./pages/home/tier/TiersList.tsx";
import DashboardCodingTestList from "./pages/dashboard/codingTest/DashboardCodingTestList.tsx";
import DashboardCodeReviewList from "./pages/dashboard/codeReview/DashboardCodeReviewList.tsx";
import DashboardQuizList from "./pages/dashboard/quiz/DashboardQuizList.tsx"; // f
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/start',
        element: <StartPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path:'/register',
        element:<RegisterPage/>
    },
    {
        path: '/home',
        element: <HomePage/>
    },
    {
        path:'/home/tierInfo',
        element:<TiersList/>
    },
    {
        path: '/content/quiz',
        element: <CreateQuizPage/>
    },
    {
        path: '/content/quiz/:id',
        element: <QuizPage/>
    },
    {
        path:'/content/quiz/:id/result',
        element:<QuizResultPage/>
    },
    {
        path: '/content/codingTest',
        element: <CreateCodingTestPage/>
    },
    {
        path:'/content/codingTest/:id',
        element:<CodingTestPage/>
    },
    {
        path:'/content/codeReview',
        element:<CreateCodeReviewPage/>
    },
    {
        path:'/content/codeReview/:id',
        element:<CodeReviewPage/>
    },
    {
        path:'/dashboard',
        element:<DashboardPage/>
    },
    {
        path:'dashboard/codingTest',
        element:<DashboardCodingTestList/>
    },
    {
        path:"dashboard/codeReview",
        element:<DashboardCodeReviewList/>

    },
    {
        path:"dashboard/quiz",
        element:<DashboardQuizList/>

    },
    {
        path:'/profile',
        element:<ProfilePage/>
    }
])
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider value={{unstyled: false}}>
                <RouterProvider router={router}/>
                <ToastContainer
                    autoClose={1700}
                    hideProgressBar
                />
            </PrimeReactProvider>
        </QueryClientProvider>
    </StrictMode>,
)
