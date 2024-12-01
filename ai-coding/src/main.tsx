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
import CodingTestPage from "./pages/content/codingTest/CodingTestPage.tsx";
import QuizPage from "./pages/content/quiz/[id]/QuizPage.tsx"; // f
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
        path: '/home',
        element: <HomePage/>
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
        path: '/content/codingTest',
        element: <CodingTestPage/>
    }
])
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider value={{unstyled: false}}>
                <RouterProvider router={router}/>
                <ToastContainer/>
            </PrimeReactProvider>
        </QueryClientProvider>
    </StrictMode>,
)
