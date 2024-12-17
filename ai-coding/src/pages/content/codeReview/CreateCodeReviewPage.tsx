import React, {useCallback, useState} from "react";
import AceEditor from "react-ace";
import Constants from "../../../utils/Constants.ts";
import {Card} from "primereact/card";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useMutation} from "@tanstack/react-query";
import api from "../../../lib/axiosSettings.ts";
import {useNavigate} from "react-router";
import BackButton from "../../../components/atom/BackButton.tsx";
import {Dialog} from "primereact/dialog";
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp.js';
import 'brace/mode/golang.js';
import 'brace/mode/abap.js';
import 'brace/mode/abap';
import 'brace/mode/abc';
import 'brace/mode/actionscript';
import 'brace/mode/ada';
import 'brace/mode/apache_conf';
import 'brace/mode/applescript';
import 'brace/mode/asciidoc';
import 'brace/mode/assembly_x86';
import 'brace/mode/autohotkey';
import 'brace/mode/batchfile';
import 'brace/mode/bro';
import 'brace/mode/c_cpp';
import 'brace/mode/clojure';
import 'brace/mode/cobol';
import 'brace/mode/coffee';
import 'brace/mode/coldfusion';
import 'brace/mode/csharp';
import 'brace/mode/css';
import 'brace/mode/d';
import 'brace/mode/dart';
import 'brace/mode/dockerfile';
import 'brace/mode/elixir';
import 'brace/mode/erlang';
import 'brace/mode/golang';
import 'brace/mode/graphqlschema';
import 'brace/mode/groovy';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/kotlin';
import 'brace/mode/lua';
import 'brace/mode/markdown';
import 'brace/mode/matlab';
import 'brace/mode/php';
import 'brace/mode/python';
import 'brace/mode/ruby';
import 'brace/mode/rust';
import 'brace/mode/sass';
import 'brace/mode/sql';
import 'brace/mode/typescript';
import 'brace/mode/yaml';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/monokai.js';
import {ProgressSpinner} from "primereact/progressspinner";

const CreateCodeReviewPage = () => {
    const [selectLanguage, setSelectLanguage] = useState(Constants.provideCodeReviewLanguage[0]);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태
    const navigate = useNavigate();

    const onChangeCode = useCallback((value) => {
        setCode(value);
    }, []);

    const {mutate} = useMutation({
        mutationFn: async (data: { language: string, code: string }) => {
            const {language, code} = data;
            return await api.post("v1/codeReview", {language, code});
        },
        onMutate: () => {
            setLoading(true); // 로딩 시작
        },
        onSuccess: (data) => {
            console.log("success",data.data.data)
            navigate(`/content/codeReview/${data.data.data.id}`);
        },
        onSettled: () => {
            setLoading(false); // 로딩 종료
        }
    });

    return (
        <Card className={'p-4'}>
            <div className="w-full h-full flex flex-col rounded-xl p-4">
                <div className="flex">
                    <BackButton/>
                </div>
                <div className="text-2xl text-start mt-4 ml-4">
                    코드 리뷰로 더 나은 코드를 만들어보세요
                </div>
                <div className="text-start ml-4 mt-1">
                    작성한 코드의 개선점과 보완 방법을 알려드립니다.<br/>
                    더 깔끔하고 효율적인 코드를 위한 리뷰 서비스를 제공합니다!
                </div>
                <div className={'text-right mb-2'}>
                    <Dropdown
                        value={selectLanguage}
                        options={Constants.provideCodeReviewLanguage}
                        optionLabel={'name'}
                        onChange={(value) => {
                            console.log(value.target.value);
                            setSelectLanguage(value.target.value);
                        }}
                    />
                </div>
                <AceEditor
                    width={'100%'}
                    mode={selectLanguage.mode}
                    theme="monokai"
                    fontSize={15}
                    value={code}
                    onChange={onChangeCode}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                />
                <div className={'my-2'}>
                    <Button className={'w-full'} onClick={() => mutate({language: selectLanguage.name, code})}>
                        코드리뷰 받기
                    </Button>
                </div>
            </div>

            {/* 로딩 다이얼로그 */}
            <Dialog
                visible={loading}
                onHide={() => {}} // 사용자가 닫을 수 없게 설정
                modal
                closable={false}
                header="코드 리뷰 요청 중"
                className="p-d-flex p-ai-center"
            >
                <div className="p-d-flex p-flex-column p-ai-center">
                    <ProgressSpinner/>
                    <p>코드 리뷰 하는중...</p>
                </div>
            </Dialog>
        </Card>
    );
};
export default CreateCodeReviewPage;
